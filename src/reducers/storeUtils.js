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
// get Error state and message
export const hasError = R.path(["appState", "hasError"]);
export const errorMessage = R.path(["appState", "errorMessage"]);

// get auth.text
export const auth = R.prop("auth");
export const authText = R.path(["auth", "text"]);
// get auth.passwordTip
export const authPasswordTip = R.path(["auth", "passwordTip"]);
// if true, we need display passwordTip & auth.text
export const authHint = R.pathEq(["auth", "success"], false);
export const username = R.path(["auth", "username"]);
// true: already login
export const authLogin = R.path(["auth", "success"]);
// token
export const authToken = R.path(["auth", "token"]);
