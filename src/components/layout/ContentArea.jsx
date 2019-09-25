// @flow
import React from "react";

import {
  privateRouteList,
  routeList,
  makePrivateRouters,
  makeRouters,
  rootRoute
} from "components/pages/router";

const contentArea = () => {
  return (
    <div>
      {rootRoute}
      {makeRouters(routeList)}
      {makePrivateRouters(privateRouteList)}
    </div>
  );
};

export default contentArea;
