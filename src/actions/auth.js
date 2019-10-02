// @flow
import R from "ramda";
import { setLoading, setError } from "actions/appState";
import { loginApi } from "apis/auth";
import { authToken } from "reducers/storeUtils";

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

// fetch with auth information (JWT)
export const authFetch = (url: string, option?: mixed) => (
  dispatch: Function,
  getState: Function
) => {
  const token = authToken(getState());

  dispatch(setLoading(true));
  const authOption = R.assocPath(
    ["headers", "Authorization"],
    "Bearer " + token
  );
  fetch(url, authOption(option))
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
