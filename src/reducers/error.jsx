// @flow
import R from "ramda";
import { SET_ERROR, CLEAR_ERROR } from "actions/error";

const initialState = {
  text: "",
  error: false
};
// authentication reducer
function errorReducer(
  state = initialState,
  action: { type: string, payload?: any }
) {
  const { type, payload } = action;
  return R.cond([
    [R.equals(SET_ERROR), R.assoc("text", payload, { error: true })],
    [R.equals(CLEAR_ERROR), R.assoc("text", "", { error: false })],
    [R.T, R.identical(state)]
  ])(type);
}

export default errorReducer;
