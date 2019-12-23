import React from "react";
import LineChartCard from "components/pureComponents/LineChartCard";
const dashBoard = props => {
  return (
    <div>
      <h2>Dashboard </h2>
      <LineChartCard cardInfo={{ title: "Title", type: "primary" }} />
    </div>
  );
};

export default dashBoard;
