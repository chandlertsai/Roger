// @flow
/**
 * - 透過 makeRouters() 建立所有 router.
 * - rootRoute: "/" router
 * 呼叫 concatAll 將所有 route array 變成一個，然後根據這個 route array 建立所有的 route
 */
import React from "react";
import R from "ramda";
import PrivateRouter from "routers/PrivateRoute";
import PermissionRouter from "routers/PermissionRoute";
import { Route } from "react-router";
import { authRoutes } from "routers/authRoutes";
import { pageRoutes } from "routers/pageRoutes";
import { testRoutes } from "routers/testRoutes";
import { getNormalRoutes } from "routers/normalRoutes";
import { getSettingsRoutes } from "routers/settingsRoutes";
import MainLayout from "components/pages/MainLayout";

const concatAll = R.reduce(R.concat, []);

const makePrivateRouter = r => {
  return (
    <PrivateRouter
      path={R.prop("to", r)}
      component={R.prop("component", r)}
      key={R.prop("to", r)}
    />
  );
};

export const rootRoute = (
  <PrivateRouter exact path="/" component={MainLayout} />
);

const makeNormalRouter = r => {
  return (
    <Route
      path={R.prop("to", r)}
      component={R.prop("component", r)}
      key={R.prop("to", r)}
    />
  );
};

const makePermissionRouter = r => (
  <PermissionRouter
    group={R.prop("permissionGroup", r)}
    path={R.prop("to", r)}
    component={R.prop("component", r)}
    key={R.prop("to", r)}
  />
);
// makeRouters: return all routers
export const makeRouters = () => {
  const _settingsRoutes = getSettingsRoutes();
  const _normalRoutes = getNormalRoutes();
  const allRoutes = concatAll([
    authRoutes,
    pageRoutes,
    testRoutes,
    _settingsRoutes,
    _normalRoutes
  ]);

  const routers = R.map(
    R.cond([
      [R.propEq("permission", "normal"), makeNormalRouter],
      [R.propEq("permission", "private"), makePrivateRouter],
      [R.propEq("permission", "permission"), makePermissionRouter]
      // [R.T, makeNormalRouter]
    ])
  )(allRoutes);

  return routers;
};
