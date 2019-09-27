// @flow
import R from "ramda";

import { SET_ERROR, SET_LOADING } from "actions/appState";

type actionType = {
  type: string,
  loading: boolean
};
const initialState = {
  loading: false
};
const appState = (state: mixed = initialState, action: actionType) => {
  const { type } = action;
  const getLoading = R.prop("loading", action);
  const errorState = R.pick(["hasError", "errorMessage"], action);
  switch (type) {
    case SET_LOADING:
      return R.assoc("loading", getLoading)(state);
    case SET_ERROR:
      return R.mergeLeft(errorState, state);
  }
  return state;
};
export default appState;
