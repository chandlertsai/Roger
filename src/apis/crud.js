// @flow
import axios from "axios";
import R from "ramda";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "actions/appState";
// Fetch 'GET'
/**
 * @return [response, get(email)]
 */
export const useSendPasswordEmail = (collection: string): [mixed, Function] => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const get = param => {
    dispatch(setLoading(true));
    axios
      .get("/api/sendpassword", { params: param })
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error.response.data)))
      .finally(() => dispatch(setLoading(false)));
  };

  return [data, get];
};

/**
 * useFetch() - eyesfree server CRUD api hooks
 * @param {collection name i.e. users, permission} collection
 * @returns [collectionContext, remove, update]
 */
export const useFetch = (collection: string): [mixed, Function, Function] => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const readUrl = "/apis/v1/read/" + collection;

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(readUrl)
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error)))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const removeurl = "/apis/removes/" + collection;
  const post = url => body => {
    dispatch(setLoading(true));
    axios
      .post(url, body)
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error)))
      .finally(() => dispatch(setLoading(false)));
  };

  const updateUrl = "/apis/v1/update/" + collection;
  const put = url => body => {
    dispatch(setLoading(true));
    axios
      .put(url, body)
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error)))
      .finally(() => dispatch(setLoading(false)));
  };

  return [data, post(removeurl), put(updateUrl)];
};

/**
 * useNameList(collection) - Get collection and pick object {key, name}
 * @param {collection name i.e. users, permission} collection
 * @returns [collectionContext, remove, update]
 */
export const useNameList = (collection: string) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const readUrl = "/apis/v1/read/" + collection;

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(readUrl)
      .then(res => {
        const namelist = R.ifElse(
          Array.isArray,
          R.map(R.pick(["name", "key"])),
          R.pick(["name", "key"])
        )(res.data);
        console.log("namelist ", namelist);
        setData(namelist);
      })
      .catch(error => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  return data;
};
