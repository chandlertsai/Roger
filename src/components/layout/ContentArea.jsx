// @flow
import React from "react";
import { connect } from "react-redux";
import R from "ramda";
import { hasError, errorMessage } from "reducers/storeUtils";
import { makeRouters, rootRoute } from "routers/router";

import { Alert } from "antd";
import { setError } from "actions/appState";
const contentArea = (props: { hasError: boolean, text: string }) => {
  console.log("contentArea ", props);
  const { hasError, text, clearError } = props;
  return (
    <div style={{ padding: "0.5rem 0" }}>
      {hasError ? (
        <Alert type='error' closable message={text} onClose={clearError} />
      ) : null}
      {rootRoute}
      {makeRouters()}
    </div>
  );
};
const mapState2Props = state => ({
  hasError: hasError(state),
  text: errorMessage(state)
});

const dispatchToProps = dispatch => ({
  clearError: () => dispatch(setError(false, ""))
});

export default connect(
  mapState2Props,
  dispatchToProps
)(contentArea);
