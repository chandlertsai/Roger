// @flow
import R from "ramda";

import {
  SET_ERROR,
  SET_LOADING,
  SET_LAST_RESPONSE,
  SET_LANGUAGE,
  SET_SIMPLELOG_LAST_TIMESTAMP,
  SET_VOICE_ENABLE,
} from "actions/appState";
import { Action, State } from "apis/types";

const initialState = {
  loading: false,
  hint: false,
  lang: "en",
  lastTS: "1970-01-01T00:00:00.358+08:00",
  voiceEnable: true,
};

const appState = (state: State = initialState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return R.assoc("loading", payload)(state);
    case SET_ERROR:
      return R.mergeLeft(payload, state);
    case SET_LAST_RESPONSE:
      return R.assoc("lastResponse", payload)(state);
    case SET_LANGUAGE:
      return R.assoc("lang", payload)(state);
    case SET_SIMPLELOG_LAST_TIMESTAMP:
      return R.assoc("lastTS", payload)(state);
    case SET_VOICE_ENABLE:
      return R.assoc("voiceEnable", payload);
  }
  return state;
};
export default appState;
