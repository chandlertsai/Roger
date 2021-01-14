// @flow
import axios from "axios";
import R from "ramda";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userKey, lastSimplelogTS, MINTIME } from "reducers/storeUtils";
import { setSimplelogLastTS, setError, setLoading } from "actions/appState";
var qs = require("qs");
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
 * Fetch simplelogs (message)
 */
const useFetchSimplelogs = () => {
  const [lastTS, setLastTS] = useState();
  const _userKey = useSelector(userKey);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const ts = useSelector(lastSimplelogTS);
  const fetch = () => {
    axios
      .get("/webapi/api/message", {
        params: {
          count: 10,
          lastTS: ts,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      })
      .then((res) => {
        let data = R.propOr([], "data")(res);

        // get lastAlarmTS and transform to Date object
        const getLastAlarmTS = R.propOr(MINTIME, "lastAlarmTS");
        const tsList = R.map(getLastAlarmTS)(data);
        const minumTime = new Date(MINTIME);
        setMessages(data);

        if (data.length <= 0) return;
        // setting lastTS
        const compareTime = (a, b) => (Date(a) > Date(b) ? a : b);
        const last = R.reduce(compareTime, minumTime, tsList);
        console.log("tslist ", tsList, "last ", last);
        dispatch(setSimplelogLastTS(last));
      })
      .catch((err) => console.log("fetch message error ", err));
  };
  return [fetch, messages];
};

/**
 * polling alarm status
 * @param opt options
 * @param {number} [opt.interval=1000] interval ms
 * @param {Function} [opt.onError] callback function when error happen.
 */
const usePollingAlarm = (opt: Option, source = "alarm", all = false) => {
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
        .get(
          "/webapi/api/" + source,
          all ? null : { params: { userKey: _userKey } }
        )
        .then((res) => {
          let data = R.propOr([], "data")(res);
          setAlarm(data);
        })
        .catch((err) => {
          console.log("polling alarm error ", err);
          setAlarm([]);
        });
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

export {
  usePollingAlarm,
  usePollingNormalDevice,
  useAlarm,
  useFetchSimplelogs,
};
