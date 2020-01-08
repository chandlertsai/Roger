// @flow
import axios from "axios";
import R from "ramda";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "actions/appState";

type Option = {
  interval: number,
  onError?: Function
};

/**
 * polling alarm status
 * @param opt options
 * @param {number} [opt.interval=1000] interval ms
 * @param {Function} [opt.onError] callback function when error happen.
 */
const usePollingAlarm = (opt: Option) => {
  const { interval = 1000, onError = err => {} } = opt;
  const [isPolling, setPolling] = useState(false);
  const [alarm, setAlarm] = useState([]);
  const [onceAlarm, setOnceAlarm] = useState([]);
  const [allAlarm, setAllAlarm] = useState([]);

  const timerID = useRef();

  useEffect(() => {
    setAllAlarm(R.concat(alarm, onceAlarm));
  }, [alarm, onceAlarm]);

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
    //console.log("start Polling", isPolling);
    runPolling();
  };

  const runPolling = () => {
    const timeoutID = setInterval(() => {
      axios
        .get("/webapi/api/alarm")
        .then(R.pipe(R.prop("data"), setAlarm))
        .catch(err => console.log("polling alarm error ", err));
      axios
        .get("/webapi/api/onceAlarm")
        .then(R.pipe(R.prop("data"), setOnceAlarm))
        .catch(err => console.log("polling once alarm error ", err));
    }, interval);
    timerID.current = timeoutID;
  };

  return [startPolling, stopPolling, isPolling, allAlarm];
};

export { usePollingAlarm };
