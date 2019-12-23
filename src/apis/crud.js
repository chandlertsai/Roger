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
 * @returns [collectionContext, remove, update, query]
 */
export const useFetch = (
  collection: string
): [mixed, Function, Function, Function] => {
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

  const query = search => {
    dispatch(setLoading(true));

    const getText = R.ifElse(
      R.is(String),
      R.identity,
      R.path(["target", "value"])
    );

    const s = getText(search || "");

    const url = s ? "/api/fuzzysearch/" + collection + "/" + s : readUrl;
    axios
      .get(url)
      .then(res => {
        setData(res.data);
      })
      .catch(error => dispatch(setError(true, error)))
      .finally(() => dispatch(setLoading(false)));
  };

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

  return [data, post(removeurl), put(updateUrl), query];
};

// useFetchFields : collection => Array<field name> => Result
//- Get collection data and pick up specific fields
export const useFetchFields = (collection: string) => (
  names: Array<string>
) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get("/apis/v1/read/" + collection)
      .then(R.pipe(R.prop("data"), R.map(R.pick(names)), setData))
      .catch(error => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  }, []);
  return data;
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

        setData(namelist);
      })
      .catch(error => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  }, []);

  return data;
};

// Use getName on useNameList return list
export const getName = (key: string) =>
  R.pipe(R.find(R.propEq("key", key)), R.prop("name"));
