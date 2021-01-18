// @flow
import React, { useState, useEffect, useRef, useReducer } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import R from "ramda";
import { Divider } from "antd";
import { useFetchSimplelogs } from "apis/alarm";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { voiceEnable } from "reducers/storeUtils";
type tProps = {
  currentAlarms: mixed,
  enable: boolean,
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// A -> string
const compareKey = (a) => R.prop("ip")(a) + R.prop("message")(a);
const eqByKey = R.eqBy(compareKey);
const decInterval = R.compose(R.dec, R.prop("interval"));
const countDown = R.map((i) => ({ ...i, interval: decInterval(i) }));
const alarmIntervalGtZero = R.filter(R.pipe(R.prop("interval"), R.gt(R.__, 0)));

const blackListReducer = (state, act) => {
  switch (act.type) {
    case "COUNTDOWN":
      return alarmIntervalGtZero(countDown(state));
    case "ADD":
      if (R.any(eqByKey(act.payload), state)) {
        return state;
      } else {
        state.push(act.payload);
        return state;
      }

    default:
      return state;
  }
};

const voiceQueueReducer = (state, act) => {
  switch (act.type) {
    case "ADD":
      return R.unionWith(R.eqBy(compareKey), state, act.payload);
    case "TAIL":
      return R.tail(state);
    default:
      return state;
  }
};

const alarmVoice = (props: tProps) => {
  const { currentAlarms = [] } = props;

  const [blackList, dispatchBlackList] = useReducer(blackListReducer, []);
  const [voiceQueue, dispatchVoiceQueue] = useReducer(voiceQueueReducer, []);
  const [onVoice, setOnVoice] = useState(false);
  const [currentVoiceMessage, setCurrentVoiceMessage] = useState("");
  const enable = useSelector(voiceEnable);
  const [fetchSimplelogs, simplelogs] = useFetchSimplelogs();
  const { t } = useTranslation();

  const title = props.title || t("alarm.alarmVoiceTitle");
  // Input Alarm changed
  useDeepCompareEffect(() => {
    const inputAlarm = R.filter((i) => !R.any(eqByKey(i), blackList))(
      currentAlarms
    );
    dispatchVoiceQueue({
      type: "ADD",
      payload: inputAlarm,
    });
  }, [currentAlarms]);

  // Interval
  useInterval(() => {
    // count down
    dispatchBlackList({
      type: "COUNTDOWN",
    });

    // Insert simplelogs into queue's head
    if (simplelogs.length > 0) {
      console.log("New message : ", simplelogs.length);
      const isVoice = (i) => R.propOr(false, "enableVoice", i) === true;
      const voiceSimplelogs = R.filter(isVoice, simplelogs);
      console.log("logs need voice ", voiceSimplelogs);
      dispatchVoiceQueue({
        type: "ADD",
        payload: voiceSimplelogs, // R.map((n) => (n.device.enableVoice = true), voiceSimplelogs),
      });
    }

    // fetch simplelogs
    fetchSimplelogs();

    if (!onVoice) {
      var alarm = R.head(voiceQueue);

      let deviceVoiceEnable = false;
      if (R.hasPath(["device", "voiceEnable"], alarm || {})) {
        deviceVoiceEnable = R.pathOr(false, ["device", "voiceEnable"], alarm);
      }

      if (alarm && alarm.enableVoice && deviceVoiceEnable) {
        dispatchVoiceQueue({
          type: "TAIL",
        });
        dispatchBlackList({
          type: "ADD",
          payload: alarm,
        });
        // count down black list interval
        if (!enable) return;
        const msg = "ip " + alarm.ip + " " + alarm.message;
        setCurrentVoiceMessage(msg);
        var words = new SpeechSynthesisUtterance(msg);
        words.addEventListener("start", () => setOnVoice(true));
        words.addEventListener("end", () => setOnVoice(false));

        window.speechSynthesis.speak(words);
      }
    }
  }, 1000);

  return (
    <div className="card text-white bg-danger">
      <div className="card-body">
        <h3 className="text-white">{title}</h3>

        <p> enable : {enable ? "true" : "false"}</p>
        <p> queue length : {voiceQueue.lentgh}</p>
        <div className="card-text">
          {JSON.stringify(
            R.pick(["name", "ip", "message"], voiceQueue),
            null,
            2
          )}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default alarmVoice;
