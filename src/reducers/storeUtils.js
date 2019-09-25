import R from "ramda";

export const loadingState = R.path(["state", "loading"]);
// get auth.text
export const authText = R.path(["auth", "text"]);
// get auth.passwordTip
export const authPasswordTip = R.path(["auth", "passwordTip"]);
// if true, we need display passwordTip & auth.text
export const authHint = R.pathEq(["auth", "success"], false);
// true: already login
export const authLogin = R.path(["auth", "success"]);
