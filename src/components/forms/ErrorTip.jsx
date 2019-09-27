import React from "react";

const ErrorDiv = props => (
  <div className='entire_row' style={{ color: "red" }}>
    {props.children}
  </div>
);

export default ErrorDiv;
