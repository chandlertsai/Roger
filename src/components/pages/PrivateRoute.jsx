import React, { Component } from "react";
import { connect } from "react-redux";
import R from "ramda";
import { authLogin } from "reducers/storeUtils";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, login, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        login ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProp = state => ({
  login: authLogin(state)
});

export default connect(mapStateToProp)(PrivateRoute);
