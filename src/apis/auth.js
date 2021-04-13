// @flow
import R from "ramda";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "actions/appState";
import { logout, refreshToken } from "actions/auth";
import {
  authToken,
  authRefreshToken,
  authTokenTimeStamp,
} from "reducers/storeUtils";

// intercepte jwt authentication token in to request
const intercepteAuthRequest = (store: any) => {
  axios.interceptors.request.use(
    (config) => {
      const token = authToken(store.getState());
      if (!token) return config;
      const authPath = ["headers", "Authorization"];
      const addToken = R.assocPath(authPath, R.concat("Bearer ", token));

      if (!R.hasPath(authPath, config)) {
        return addToken(config);
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
};
// intercepte refresh in to response when error happen
const intercepteRefreshAxios = (store: any) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      const state = store.getState();

      if (err.response.status !== 401) {
        return new Promise((resolve, reject) => reject(err));
      }

      // Logout user if token refresh didn't work or user is disabled
      if (err.config.url == "/apis/token/refresh") {
        store.dispatch(logout());
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }

      const token = authRefreshToken(state);

      return axios
        .get("/apis/token/refresh", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          store.dispatch(refreshToken(res.data));
          const config = err.config;
          config.headers["Authorization"] = `Bearer ${res.data.token}`;
          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });
        })
        .catch((err) => Promise.reject(err));
    }
  );
};

const PermissionGroup = {
  license: "License",
  users: "Users",
  group: "Group",
  settings: {
    tts: "TTS",
    errorMessage: "ErrorMessage",
    specialMonitor: "Monitor1",
  },

  device: {
    information: "Device",
    vendor: "Vendor",
    monitor: "DeviceMonitor",
    errorLog: "DeviceErrorLog",
    maintainLog: "DeviceManintainLog",
    errorReport: "DeviceErrorReport",
    alarm: "DevcieAlarm",
  },

  sidebar: {
    dashboard: "dasboard",
    report: "report",
    userSetting: "userSetting",
    deviceSetting: "deviceSetting",
    alarmSetting: "alarmSetting",
    system: "systemManagement",
  },
};

/**
 * @returns permissions:Array<permission>
 */
const usePermission = (): Array<mixed> => {
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/apis/v1/read/permission")
      .then((res) => res.data)
      .then(setPermissions)
      .catch((error) => dispatch(setError(true, error.message)))
      .finally(dispatch(setLoading(false)));
  }, []);

  return permissions;
};

export {
  intercepteRefreshAxios,
  intercepteAuthRequest,
  PermissionGroup,
  usePermission,
};
