// @flow
import axios from "axios";
import R from "ramda";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "actions/appState";
//Update 'PUT'
const apiPut = (url: string, body: any) => {
  axois({
    method: "PUT"
  });
};

/**
 * useFetch() - eyesfree server CRUD api hooks
 * @param {collection name i.e. users, permission} collection
 * @returns [collectionContext, remove, update]
 */
export const useFetch = (collection: string): [mixed, Function, Function] => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const basicUrl = "/apis/v1/" + collection;

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(basicUrl)
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const removeurl = "/apis/removes/" + collection;
  const post = url => body => {
    dispatch(setLoading(true));
    axios
      .post(url, R.omit(["_id"], body))
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  };

  const put = url => body => {
    dispatch(setLoading(true));
    axios
      .put(url, R.omit(["_id"], body))
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  };

  return [data, post(removeurl), put(basicUrl)];
};
