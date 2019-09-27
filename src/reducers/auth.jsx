// @flow
import R from "ramda";
import { LOGIN, SET_PASSWORD_TIP } from "actions/auth";

const initialState = {
  username: "",
  password: "",
  passwordTip: "",
  token: ""
};
// authentication reducer
function auth(
  state: mixed = initialState,
  action: { type: string, payload?: any }
) {
  const { type, passwordTip, user } = action;

  switch (type) {
    case LOGIN:
      return R.mergeLeft(user, state);
    case SET_PASSWORD_TIP:
      return R.mergeLeft(passwordTip, state);

    default:
      return state;
  }
}

export default auth;
