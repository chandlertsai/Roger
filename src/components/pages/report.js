import React, { useState, useEffect } from "react";
import R from "ramda";
import axios from "axios";
var qs = require("qs");
const debuglog = R.tap((x) => console.log("DEBUG====> ", x));

const alarmKeyList = R.map(R.pick(["key"]));
const getAlarmkeys = R.pipe(
  alarmKeyList,
  R.map((v) => v.key)
);

// reducer used in reduce() to calculate elapsed times
const calculateElapsed = (a, v) => {
  const { state, lastTS } = v;
  const {
    lastState,
    lastStateTS,
    alarmElapse,
    ackElapse,
    closeElapse,
    alarmTimes,
  } = a;
  if (lastState === "begin") {
    return R.mergeLeft(
      {
        lastStateTS: lastTS,
        lastState: state,
      },
      a
    );
  }

  const startDate = new Date(lastStateTS);
  const endDate = new Date(lastTS);
  const elapsed = endDate - startDate;

  let acc = R.mergeLeft({ lastStateTS: lastTS, lastState: state }, a);

  switch (lastState) {
    case "alarm":
      acc.alarmTimes = alarmTimes + 1;
      acc.alarmElapse = alarmElapse + elapsed;
      break;
    case "ack":
      acc.ackElapse = alarmElapse + elapsed;
      break;
    case "close":
      acc.closeElapse = alarmElapse + elapsed;
      break;
  }
  return acc;
};

const sortHistoryByIndex = R.compose(
  R.sortBy(R.prop("index")),
  R.propOr([], "data")
);
const getHistoryByAlarm = (alarmKey) => R.filter(R.propEq("key", alarmKey));
const defaultHistoryResult = {
  alarmElapse: 0,
  ackElapse: 0,
  closeElapse: 0,
  lastState: "begin",
  lastStateTS: 0,
  alarmTimes: 0,
};

const _fetchHistory = async (currentDevice) => {
  let retObject = {};
  try {
    const deviceReponse = await axios.get("webapi/api/devices", {
      params: { key: currentDevice },
    });

    const reportdata = R.head(deviceReponse.data);

    retObject["device"] = reportdata;
    const alarms = R.propOr([], ["alarms"])(reportdata);
    const alarmkeys = getAlarmkeys(alarms);
    //console.log("alarms: ", alarms);

    const histroyByDevice = await axios.get("webapi/api/alarmHistory", {
      params: { key: alarmkeys },
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    });

    const sortedHistory = sortHistoryByIndex(histroyByDevice);

    const combineAlarmAndHistory = R.map((v) => {
      const key = R.prop("key")(v);
      let history = getHistoryByAlarm(key)(sortedHistory);
      history = R.append({ state: "end", lastTS: Date.now() }, history);

      const historyResult = R.reduce(
        calculateElapsed,
        defaultHistoryResult
      )(history);

      return R.mergeLeft(v, R.mergeLeft(historyResult, { history: history }));
    }, alarms);
    retObject["history"] = combineAlarmAndHistory;
    // setAlarmHistory(combineAlarmAndHistory);
  } catch (err) {
    console.log(err);
    return retObject;
  }
  return retObject;
};

function useDeviceReport() {
  const [fetching, setFetching] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [alarmHistory, setAlarmHistory] = useState();

  async function fetchHistory(key) {
    let ret = await _fetchHistory(key);
    setDeviceInfo(R.propOr({}, "device", ret));
    setAlarmHistory(R.propOr([], "history", ret));
  }

  return { deviceInfo, alarmHistory, fetching, fetchHistory };
}

const getData = R.prop("data");
async function fetchAllHistory() {
  try {
    const _r = await axios.get("webapi/api/devices");
    const devices = getData(_r);
    const _ra = await axios.get("webapi/api/alarmHistory");
    const histories = getData(_ra);

    return { devices, histories };
  } catch (err) {
    return { devices: [], histories: [] };
  }
}

function useAllDevicesSummary() {
  const [devices, setDevices] = useState();
  const [result, setDevResults] = useState();
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      setFetching(true);
      let ret = await fetchAllHistory();
      const histories = R.propOr([], "histories")(ret);

      const devResult = R.map((dev) => {
        const alarms = R.propOr([], ["alarms"])(dev);
        // console.log("dev: ", dev);
        if (!!alarms) {
          const percentageResult = {
            alarmElapse: 0 / 100,
            ackElapse: 0 / 100,
            closeElapse: 0 / 100,
            alarmTimes: 0,
          };
          // console.log("fineshed dev", dev);

          return {
            name: dev.name,
            ip: dev.ip,
            ...percentageResult,
            key: dev.key,
          };
        }
        const alarmkeys = getAlarmkeys(alarms);
        // console.log("dev: ", dev);

        const historyByDevice = R.filter((v) =>
          R.contains(R.prop("key", v), alarmkeys)
        )(histories);

        const sortedHistory = R.sortBy(R.prop("index"))(historyByDevice);
        // console.log("historyByDevice ", historyByDevice, sortedHistory);

        const results = R.map((v) => {
          const _key = R.prop("key")(v);
          let history = getHistoryByAlarm(_key)(sortedHistory);
          // console.log("history ", history, sortedHistory);
          history = R.append({ state: "end", lastTS: Date.now() }, history);
          // console.log("history ", history);
          const historyResult = R.reduce(
            calculateElapsed,
            defaultHistoryResult
          )(history);

          return historyResult;
        }, alarms);
        // console.log("result ", results);

        const sumOfResult = R.reduce(
          (a, v) => {
            const alarmElapse = a.alarmElapse + v.alarmElapse;
            const ackElapse = a.ackElapse + v.ackElapse;
            const closeElapse = a.closeElapse + v.closeElapse;
            const alarmTimes = a.alarmTimes + v.alarmTimes;
            return { alarmElapse, ackElapse, closeElapse, alarmTimes };
          },
          { alarmElapse: 0, ackElapse: 0, closeElapse: 0, alarmTimes: 0 },
          results
        );
        // console.log("SUM ", sumOfResult);
        const totalElapse =
          sumOfResult.alarmElapse +
          sumOfResult.ackElapse +
          sumOfResult.closeElapse +
          0.00001;

        const percentageResult = {
          alarmElapse:
            Math.round((sumOfResult.alarmElapse / totalElapse) * 10000) / 100,
          ackElapse:
            Math.round((sumOfResult.ackElapse / totalElapse) * 10000) / 100,
          closeElapse:
            Math.round((sumOfResult.closeElapse / totalElapse) * 10000) / 100,
          alarmTimes: sumOfResult.alarmTimes,
        };
        console.log("fineshed dev", dev);

        return {
          name: dev.name,
          ip: dev.ip,
          ...percentageResult,
          key: dev.key,
        };
        console.log("combineAlarmAndHistory", combineAlarmAndHistory);
      }, R.prop("devices", ret));

      setFetching(false);
      setDevResults(devResult);
      return ret;
    };
    fetchdata();
  }, []);

  return [fetching, result];
}

export { useDeviceReport, useAllDevicesSummary };
