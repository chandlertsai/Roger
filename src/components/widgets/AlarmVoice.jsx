// @flow
import React, { useState, useEffect, useRef, useReducer } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import R from "ramda";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
type tProps = {
  currentAlarms: mixed,
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
  const { currentAlarms } = props;

  const [blackList, dispatchBlackList] = useReducer(blackListReducer, []);
  const [voiceQueue, dispatchVoiceQueue] = useReducer(voiceQueueReducer, []);
  const [onVoice, setOnVoice] = useState(false);
  const [currentVoiceMessage, setCurrentVoiceMessage] = useState("");

  const { t } = useTranslation();

  const title = props.title || t("alarm.alarmVoiceTitle");
  // Input Alarm changed
  useEffect(() => {
    const inputAlarm = R.filter((i) => !R.any(eqByKey(i), blackList))(
      currentAlarms
    );
    dispatchVoiceQueue({
      type: "ADD",
      payload: inputAlarm,
    });
  }, [currentAlarms]);

  useInterval(() => {
    // count down black list interval
    dispatchBlackList({
      type: "COUNTDOWN",
    });

    if (!onVoice) {
      var alarm = R.head(voiceQueue);
      if (alarm && alarm.enableVoice) {
        dispatchVoiceQueue({
          type: "TAIL",
        });
        dispatchBlackList({
          type: "ADD",
          payload: alarm,
        });
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
    // <div className="card text-white bg-danger">
    //   <div className="card-body">
    //     <h3 className="text-white">{title}</h3>
    //     <div className="card-text">{currentVoiceMessage}</div>
    //   </div>
    // </div>
    <Divider />
  );
};

export default alarmVoice;
