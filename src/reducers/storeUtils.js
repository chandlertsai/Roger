// @flow
/**
 * This file provied convenient functions to access store
 */
import R from "ramda";

//General
// toggle: [path]
export const toggle = (path: Array<string>) => R.over(R.lensPath(path), R.not);

/////////////////////////////////////////////
// appState r/w
// get loadingState
export const loadingState = R.path(["appState", "loading"]);
export const appStateHint = R.pathEq(["appState", "hint"], false);

// get Error state and message
export const errorState = R.path(["appState", "hasError"]);
export const errorMessage = R.path(["appState", "errorMessage"]);

// get auth.text
export const auth = R.prop("auth");
export const authText = R.path(["auth", "text"]);
// get auth.passwordTip
export const authPasswordTip = R.path(["auth", "passwordTip"]);
// if true, we need display passwordTip & auth.text

export const username = R.path(["auth", "username"]);
// true: already login
export const authLogin = R.path(["auth", "success"]);
export const authPkey = R.path(["auth", "pkey"]);
// token
export const authToken = R.path(["auth", "token"]);
export const authRefreshToken = R.path(["auth", "refreshToken"]);
export const authTokenTimeStamp = R.path(["auth", "tokenTimeStamp"]);
