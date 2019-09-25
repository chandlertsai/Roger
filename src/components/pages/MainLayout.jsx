// @flow
import React from "react";
import { connect } from "react-redux";

import Login from "components/pages/Login";
import { loadingState } from "reducers/storeUtils";
import { Redirect } from "react-router";

const MainLayout = (props: {}) => {
  return (
    <>
      <h2>Main Layout</h2>
    </>
  );
};

const mapStateToProps = state => ({
  login: loadingState(state)
});
export default connect(mapStateToProps)(MainLayout);
