// @flow
import React from "react";

import { makeRouters, rootRoute } from "routers/router";

const contentArea = () => {
  return (
    <div>
      {rootRoute}
      {makeRouters()}
    </div>
  );
};

export default contentArea;
