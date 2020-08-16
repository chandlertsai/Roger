// @flow
import axios from "axios";
import R from "ramda";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userKey } from "reducers/storeUtils";
import { setError, setLoading } from "actions/appState";

type Option = {
  interval: number,
  onError?: Function,
};

/**
 * Get alarm data
 * @returns [alarns, getAlarm]
 *
 */
const useAlarm = () => {
  const defaultAlarm = R.defaultTo({
    key: "",
    conditions: [],
    message: "",
    name: "",
    pollingInterval: "10",
    source: "",
    triggerType: "",
  });
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    axios
      .get("/apis/v1/read/alarms")
      .then(R.pipe(R.prop("data"), setAlarms))
      .catch((err) => setAlarms([defaultAlarm({})]));
  });

  const getAlarm = (key) => defaultAlarm(R.find(R.propEq("key", key))(alarms));

  return [alarms, getAlarm];
};
/**
 * polling alarm status
 * @param opt options
 * @param {number} [opt.interval=1000] interval ms
 * @param {Function} [opt.onError] callback function when error happen.
 */
const usePollingAlarm = (opt: Option, source = "alarm") => {
  const { interval = 1000, onError = (err) => {} } = opt;
  const [isPolling, setPolling] = useState(false);
  const [alarm, setAlarm] = useState([]);

  const _userKey = useSelector(userKey);
  const timerID = useRef();

  const stopPolling = () => {
    //console.log("into stopPolling", isPolling);
    //if (!isPolling) return;

    if (timerID.current) {
      clearInterval(timerID.current);
      timerID.current = null;
    }
    setPolling(false);
  };

  const startPolling = () => {
    setPolling(true);
    runPolling();
  };
  const runPolling = () => {
    const timeoutID = setInterval(() => {
      axios
        .get("/webapi/api/" + source, { params: { userKey: _userKey } })
        .then(R.pipe(R.prop("data"), setAlarm))
        .catch((err) => console.log("polling alarm error ", err));
    }, interval);
    timerID.current = timeoutID;
  };

  return [startPolling, stopPolling, isPolling, alarm];
};

/**
 * polling alarm status
 * @param opt options
 * @param {number} [opt.interval=1000] interval ms
 * @param {Function} [opt.onError] callback function when error happen.
 */
const usePollingNormalDevice = (opt: Option) => {
  const { interval = 1000, onError = (err) => {} } = opt;
  const [isPolling, setPolling] = useState(false);
  const [normalDevices, setNormalDevices] = useState([]);

  const timerID = useRef();

  const stopPolling = () => {
    //console.log("into stopPolling", isPolling);
    //if (!isPolling) return;

    if (timerID.current) {
      clearInterval(timerID.current);
      timerID.current = null;
    }
    setPolling(false);
  };

  const startPolling = () => {
    setPolling(true);
    runPolling();
  };

  const runPolling = () => {
    const timeoutID = setInterval(() => {
      axios
        .get("/webapi/api/normalDevices")
        .then(R.pipe(R.prop("data"), setNormalDevices))
        .catch((err) => console.log("polling normal devices error ", err));
    }, interval);
    timerID.current = timeoutID;
  };

  return [startPolling, stopPolling, isPolling, normalDevices];
};

export { usePollingAlarm, usePollingNormalDevice, useAlarm };
