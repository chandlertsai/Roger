import React from "react";

const hide = ({ show, children }) => <>{show ? children : null}</>;

export default hide;
