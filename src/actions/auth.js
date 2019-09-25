// @flow
import R from "ramda";
export const LOGIN = "LOGIN";
export const WRONG_LOGIN = "WRONG_LOGIN";

export function loginAct(auth: {
  username: string,
  password: string,
  token: string
}) {
  return { type: LOGIN, payload: R.assoc("state", "success", auth) };
}

export function wrongLoginAct(auth: mixed) {
  return { type: WRONG_LOGIN, payload: R.assoc("state", "wrong", auth) };
}
