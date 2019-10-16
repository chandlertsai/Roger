// @flow
import axios from "axios";
import { setLoading, setError } from "actions/appState";
import type { ThunkAction, Action } from "apis/types";

export const SET_USERS = "SET_USERS";
export const setUsers = (users): Action => ({
  type: SET_USERS,
  payload: users
});

export const fetchUsers = (): ThunkAction => {
  return dispatch => {
    dispatch(setLoading(true));
    axios
      .get("/apis/v1/users")
      .then(res => {})
      .catch(error => {});
  };
};
