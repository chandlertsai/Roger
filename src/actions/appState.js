// @flow
import { authToken } from "reducers/storeUtils";
import axios from "axios";
import { logout } from "actions/auth";
import R from "ramda";
const SET_LOADING = "SET_LOADING";

// {type, loading= true|false}
const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    payload: loading
  };
};

const SET_ERROR = "SET_ERROR";

// {type, state: true|false, message:string}
const setError = (error: boolean, errorMessage: string) => ({
  type: SET_ERROR,
  payload: {
    hasError: error,
    errorMessage
  }
});

const SET_LAST_RESPONSE = "SET_LAST_RESPONSE";
const setLastResponse = (lastResponse: mixed) => ({
  type: SET_LAST_RESPONSE,
  payload: JSON.stringify(lastResponse)
});

const defaultOption = {
  timeout: 2000,
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
  //body: JSON.stringify(body)
};
// fetch with auth information (JWT)
const authFetch = (config: mixed) => (
  dispatch: Function,
  getState: Function
) => {
  // const token = authToken(getState());
  const _opt = R.mergeLeft(config, defaultOption);

  dispatch(setLoading(true));
  // console.log(_opt);
  axios({
    ..._opt
  })
    .then(res => {
      if (res.data === "AuthError") {
        dispatch(logout());
        dispatch(setError(true, "認証過期或是錯誤"));
      }
      dispatch(setLoading(false));
      dispatch(setLastResponse(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(setLoading(false));
      dispatch(setError(true, err.message));
    });
};

export {
  SET_LOADING,
  setLoading,
  SET_ERROR,
  setError,
  SET_LAST_RESPONSE,
  setLastResponse,
  authFetch
};
