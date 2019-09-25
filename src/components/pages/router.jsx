import React from "react";
import R from "ramda";
import PrivateRouter from "./PrivateRoute";
import { Route } from "react-router";
import WelCome from "./WelCome";
import MainLayout from "./MainLayout";
import Login from "components/pages/Login";

export const privateRouteList = [["/welcome", WelCome]];
export const routeList = [["/login", Login]];
export const makePrivateRouters = routeList => {
  return R.map(pair => (
    <PrivateRouter
      path={R.nth(0, pair)}
      component={R.nth(1, pair)}
      key={R.nth(0, pair)}
    />
  ))(routeList);
};

export const rootRoute = (
  <PrivateRouter exact path='/' component={MainLayout} />
);
export const makeRouters = routeList => {
  return R.map(pair => (
    <Route
      path={R.nth(0, pair)}
      component={R.nth(1, pair)}
      key={R.nth(0, pair)}
    />
  ))(routeList);
};
