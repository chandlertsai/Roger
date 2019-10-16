// @flow
import R from "ramda";

import { SET_ERROR, SET_LOADING, SET_LAST_RESPONSE } from "actions/appState";
import { Action, State } from "apis/types";

const initialState = {
  loading: false,
  hint: false
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
  }
  return state;
};
export default appState;
