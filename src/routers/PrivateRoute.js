import React, { Component } from "react";
import { useSelector } from "react-redux";
import R from "ramda";
import { authLogin } from "reducers/storeUtils";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const login = useSelector(authLogin);
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

export default PrivateRoute;
