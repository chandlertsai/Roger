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

const isString = R.is(String);
const haveError = R.has("error");
const getResponseErrorMessage = R.cond([
  [isString, R.identity],
  [haveError, R.prop("error")],
  [R.T, R.identity]
]);

const getErrorMessage = R.cond([
  [isString, R.identity],
  [R.has("message"), R.prop("message")],
  [R.T, R.identity]
]);

// {type, state: true|false, message: axios error object}
const setError = (error: boolean, err: mixed | string) => {
  console.log("got error ", err);
  const responsePath = ["response", "data"];
  const haveResponse = R.hasPath(responsePath);
  const responseData = R.path(responsePath);
  const errorMessage = R.prop("message");
  let text = R.ifElse(
    haveResponse,
    R.pipe(responseData, getResponseErrorMessage),
    getErrorMessage
  )(err);

  if (text === undefined) text = err;

  return {
    type: SET_ERROR,
    payload: {
      hasError: error,
      errorMessage: text
    }
  };
};

const SET_LAST_RESPONSE = "SET_LAST_RESPONSE";
const setLastResponse = (lastResponse: mixed) => ({
  type: SET_LAST_RESPONSE,
  payload: JSON.stringify(lastResponse)
});

const SET_LANGUAGE = "SET_LANGUAGE";
const setLanguage = (lang: string) => ({
  type: SET_LANGUAGE,
  payload: lang
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
  SET_LANGUAGE,
  setLanguage,
  authFetch
};
