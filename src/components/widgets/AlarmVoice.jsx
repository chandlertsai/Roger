// @flow
import React, { useState, useEffect, useRef, useReducer } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import R from "ramda";
import { Divider, Table } from "antd";
import { useFetchSimplelogs } from "apis/alarm";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
type tProps = {
  alarms: mixed,
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
const compareKey = (a) =>
  R.propOr("", "ip")(a) + R.propOr("nonmessage9976", "message")(a);
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

const defaultVoiceController = {
  messageQueue: [],
  alarmQueue: [],
  currentIndex: 0,
  working: false,
};

const voiceControllerReducer = (state, act) => {
  switch (act.type) {
    case "SET_INDEX":
      if (act.payload >= state.alarmQueue.length) {
        return R.assoc("currentIndex", 0, state);
      }
      return R.assoc("currentIndex", act.payload, state);

    case "ADD_INDEX":
      let nextIndex = R.prop("currentIndex".state) + 1;
      if (nextIndex >= state.alarmQueue.length) nextIndex = 0;
      return R.assoc("currentIndex", nextIndex, state);

    case "ACT":
      return R.assoc("working", true, state);
    case "FINISH":
      return R.assoc("working", false, state);
    case "ADD_ALARM":
      const aq = R.unionWith(R.eqBy(compareKey), state.alarmQueue, act.payload);
      return R.assoc("alarmQueue", aq, state);
    case "ADD_MESSAGE":
      const mq = R.insertAll(0, act.payload, state.messageQueue);
      return R.assoc("messageQueue", mq, state);
    case "SET_MESSAGE":
      return R.assoc("messageQueue", act.payload, state);
    // case "TAIL":
    //   return R.tail(state);
    default:
      return state;
  }
};

const alarmVoice = (props: tProps) => {
  const { alarms = [] } = props;

  const [blackList, dispatchBlackList] = useReducer(blackListReducer, []);
  const [voiceController, dispatchVoice] = useReducer(
    voiceControllerReducer,
    defaultVoiceController
  );

  const [currentVoiceMessage, setCurrentVoiceMessage] = useState("");
  const [fetchSimplelogs, simplelogs] = useFetchSimplelogs();
  const { t } = useTranslation();

  const isEnableVoice = (obj) => {
    console.log("isEnableVoice ", obj);
    const deviceVoiceEnable = R.pathOr(false, ["device", "enableVoice"], obj);
    const alarmVoiceEnable = R.propOr(false, "enableVoice", obj);
    return deviceVoiceEnable && alarmVoiceEnable;
  };

  const isInBlackList = (a) => {
    if (blackList.length <= 0) return false;
    const exist = R.any(eqByKey(a), blackList);
    //console.log("isInBlackList ", a, (" black ": blackList), "  exist ", exist);
    return exist;
  };

  const addLastVoiceMessage = () => {
    if (simplelogs.length > 0) {
      const voiceSimplelogs = R.filter(isEnableVoice, simplelogs);
      if (voiceSimplelogs.length > 0) {
        console.log("Add voice ", voiceSimplelogs);
        dispatchVoice({
          type: "ADD_MESSAGE",
          payload: voiceSimplelogs, // R.map((n) => (n.device.enableVoice = true), voiceSimplelogs),
        });
      }
    }
  };
  const getNextSpeakAlarm = () => {
    if (voiceController.messageQueue.length > 0) {
      const alarm = voiceController.messageQueue.shift();
      dispatchVoice({
        type: "SET_MESSAGE",
        payload: voiceController.messageQueue,
      });
      console.log("SET MESSAGE ", voiceController.messageQueue);
      return alarm;
    }

    let index = voiceController.currentIndex;

    while (index <= voiceController.alarmQueue.length) {
      const a = voiceController.alarmQueue[index];
      console.log("Alarm at index ", index, a);
      if (!isInBlackList(a)) {
        console.log("no message idx ", index);
        dispatchVoice({ type: "SET_INDEX", payload: index + 1 });
        dispatchBlackList({
          type: "ADD",
          payload: a,
        });
        return a;
      }
      index = index + 1;
    }
    return undefined;
  };

  const title = props.title || t("alarm.alarmVoiceTitle");
  // Input Alarm changed
  useDeepCompareEffect(() => {
    // const inputAlarm = R.filter((i) => !R.any(eqByKey(i), blackList))(
    //   alarms
    // );
    const voiceEnabledAlarm = R.filter(isEnableVoice, alarms);
    console.log("Add voice enabled alarm ", voiceEnabledAlarm);
    dispatchVoice({
      type: "ADD_ALARM",
      payload: voiceEnabledAlarm,
    });
  }, [alarms]);

  // Interval
  useInterval(() => {
    // count down
    dispatchBlackList({
      type: "COUNTDOWN",
    });

    addLastVoiceMessage();

    // fetch simplelogs
    fetchSimplelogs();

    if (!voiceController.working) {
      var index = voiceController.currentIndex;
      const alarm = getNextSpeakAlarm();
      if (alarm === undefined) return;
      const msg = "ip " + alarm.ip + " " + alarm.message;
      setCurrentVoiceMessage(msg);
      var words = new SpeechSynthesisUtterance(msg);
      words.addEventListener("start", () => dispatchVoice({ type: "ACT" }));
      words.addEventListener("end", () => dispatchVoice({ type: "FINISH" }));

      window.speechSynthesis.speak(words);
    }
  }, 1000);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Message", dataIndex: "message", key: "message" },
  ];

  const blacklistColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Interval", dataIndex: "interval", key: "interval" },
  ];

  return (
    <div className="card text-white bg-danger">
      <div className="card-body">
        <h3 className="text-white">{title}</h3>
      </div>
      <h5>Black</h5>
      <Table columns={blacklistColumns} dataSource={blackList} />
      <h5>AlarmQueue</h5>
      <Table columns={columns} dataSource={voiceController.alarmQueue} />
      <h5>MessageQueue</h5>
      <Table columns={columns} dataSource={voiceController.messageQueue} />
    </div>
  );
};

export default alarmVoice;
