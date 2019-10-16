// @flow
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import R from "ramda";
import { errorState, errorMessage } from "reducers/storeUtils";
import { makeRouters, rootRoute } from "routers/router";

import { Alert } from "antd";
import { setError } from "actions/appState";
const contentArea = () => {
  const _hasError = useSelector(errorState);
  const text = useSelector(errorMessage);
  const dispatch = useDispatch();
  const clearError = () => dispatch(setError(false, ""));
  console.log("ContentArea hasError: ", _hasError, " text: ", text);

  return (
    <div style={{ padding: "0.5rem 0" }}>
      {_hasError ? (
        <Alert type='error' closable message={text} onClose={clearError} />
      ) : null}
      {rootRoute}
      {makeRouters()}
    </div>
  );
};

export default contentArea;
