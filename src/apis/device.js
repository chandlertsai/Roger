//@flow
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { setLoading, setError } from "actions/appState";
import { useDispatch, useSelector } from "react-redux";
import { userKey } from "reducers/storeUtils";

import R from "ramda";

type Option = {
  interval: number,
  onError?: Function,
};
/**
 * @returns devices:Array<device>
 */
export const useDevices = (): Array<mixed> => {
  const [devices, setDevices] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/webapi/api/devices")
      .then((res) => setDevices(res.data))

      .catch((error) => dispatch(setError(true, error.message)))
      .finally(dispatch(setLoading(false)));
  }, []);

  return devices;
};

// ()=> {alarm: [devices] ,ack:[devices]}
export const usePollingDevice = (opt: Option) => {
  const { interval = 1000, onError = (err) => {} } = opt;
  const [isPolling, setPolling] = useState(false);
  const [alarmDevices, setAlarmDevices] = useState([]);
  const [ackDevices, setAckDevices] = useState([]);

  const timerID = useRef();
  const _userKey = useSelector(userKey);
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
        .get("/webapi/api/devices", {
          params: { state: "alarm", userKey: _userKey },
        })
        .then(R.pipe(R.prop("data"), setAlarmDevices))
        .catch((err) => console.log("polling alarms devices error ", err));
      axios
        .get("/webapi/api/devices", {
          params: { state: "ack", userKey: _userKey },
        })
        .then(R.pipe(R.prop("data"), setAckDevices))
        .catch((err) => console.log("polling alarms devices error ", err));
    }, interval);
    timerID.current = timeoutID;
  };

  return [startPolling, stopPolling, isPolling, alarmDevices, ackDevices];
};
