// @flow
/**
 * This file provied convenient functions to access store
 */
import R from "ramda";

//General
// toggle: [path]
export const toggle = path => R.over(R.lensPath(path), R.not);

// get loadingState
export const loadingState = R.path(["state", "loading"]);
// get auth.text
export const authText = R.path(["auth", "text"]);
// get auth.passwordTip
export const authPasswordTip = R.path(["auth", "passwordTip"]);
// if true, we need display passwordTip & auth.text
export const authHint = R.pathEq(["auth", "success"], false);
// true: already login
export const authLogin = R.path(["auth", "success"]);

// App state
export const showSidebar = R.path(["appState", "showSidebar"]);
export const toggleShowSidebar = toggle(["appState", "showSidebar"]);
