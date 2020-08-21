// @flow
import R from "ramda";
import { LOGIN, LOGOUT, REFRESH_TOKEN } from "actions/auth";
import type { Action, State } from "apis/types";
import history from "routers/history";
const initialState = {
  username: "",
  password: "",
  token: "",
  success: false,
  refreshToken: "",
  tokenTimeStamp: 0,
  refreshTimeStamp: 0,
};
// authentication reducer
function auth(state: State = initialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      const timeStamp = R.assoc(R.__, new Date().getTime());
      const addTimeStamp = R.pipe(
        timeStamp("tokenTimeStamp"),
        timeStamp("refreshTimeStamp")
      );

      return R.mergeLeft(addTimeStamp(payload), state);
    case REFRESH_TOKEN:
      return R.mergeLeft(payload, state);
    case LOGOUT:
      return initialState; // R.mergeLeft(initialState, state);

    //return R.mergeLeft(payload, state);
    default:
      return state;
  }
}

export default auth;
