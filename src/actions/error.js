export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export function setError(err) {
  return {
    type: SET_ERROR,
    payload: err
  };
}

export function clearError(err) {
  return {
    type: CLEAR_ERROR
  };
}
