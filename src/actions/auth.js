// @flow
import R from "ramda";
import { setLoading, setError } from "actions/appState";
import { loginApi } from "apis/auth";

export const SET_PASSWORD_TIP = "SETPASSWORDTIP";
const setPasswrodTip = (tip: string) => ({
  type: SET_PASSWORD_TIP,
  tip
});
// login action {type, status:"success"|"error", error:" users not found"}
// logingUser -> success? loginSuccess{LOGIN,user} : setError(err)
export const LOGIN = "LOGIN";
const loginSuccess = user => ({
  type: LOGIN,
  user
});

export function loginUser(auth: { username: string, password: string }) {
  return (dispatch: Function) => {
    dispatch(setLoading(true));
    loginApi(auth)
      .then(user => {
        dispatch(setLoading(false));
        console.log("response :", user);
        if (user.success) {
          dispatch(loginSuccess(user));
        } else {
          dispatch(setPasswrodTip(user.text));
          dispatch(setError(true, user.text || "Unknow Error!"));
        }
      })
      .catch(err => {
        dispatch(setError(true, err));
      });
  };
}
