// @flow
import R from "ramda";
import { setLoading, setError } from "actions/appState";
import qs from "qs";
import axios from "axios";
import history from "routers/history";
import type { ThunkAction } from "apis/types";

// login action {type, user: from server}
// logingUser -> success? loginSuccess{LOGIN,user} : setError(err)
export const LOGIN = "LOGIN";
const loginSuccess = (user) => ({
  type: LOGIN,
  payload: user,
});

export function loginUser(auth: {
  username: string,
  password: string,
}): ThunkAction {
  return (dispatch: Function) => {
    dispatch(setLoading(true));
    axios
      .post("/api/login", auth)
      .then((res) => {
        const { data } = res;
        dispatch(setLoading(false));

        const login = R.ifElse(
          R.propEq("success", true),
          R.pipe(loginSuccess, dispatch),
          (data) => {
            dispatch(setError(true, data.text));
          }
        );
        login(data);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(true, err.message));
      });
  };
}

export const LOGOUT = "LOGOUT";
export const logout = (): ThunkAction => (dispatch: Function) => {
  history.push("/login");
  dispatch({ type: LOGOUT });
};

export const REFRESH_TOKEN = "REFRESHT_TOKEN";
// tokens:{token, refreshToken}
export const refreshToken = (tokens: {
  token: string,
  refreshToken: string,
}) => ({
  type: REFRESH_TOKEN,
  payload: tokens,
});

export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const updatePasssword = (password: {
  newpassword: string,
  passwordtip: string,
}) => {
  return (dispatch: Function, getState: Function) => {
    const key = R.path(["auth", "key"])(getState());

    const payload = {
      password: password.newpassword,
      passwordTip: password.passwordtip,
    };
    dispatch(setLoading(true));

    axios({
      method: "PUT",
      url: "/apis/v1/update/users",
      data: {
        key,
        ...payload,
      },
    })
      .then((res) => {
        dispatch(setError(true, "Done"));
        dispatch(setLoading(false));
      })

      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(setError(true, err.message));
      });
  };
};
// Update password
