import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "actions/appState";
import axios from "axios";

export const useLicense = () => {
  const [license, setData] = useState({});
  const dispatch = useDispatch();
  const readUrl = "/api/license";

  function fetch() {
    dispatch(setLoading(true));
    axios
      .get(readUrl)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => dispatch(setError(true, error.message)))
      .finally(() => dispatch(setLoading(false)));
  }
  useEffect(() => {
    fetch();
  }, []);

  return { license, fetch };
};
