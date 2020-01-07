import React from "react";
import { Row, Col } from "antd";
import LineChartCard from "components/pureComponents/LineChartCard";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import CurrentAlarm from "components/widgets/CurrentAlarm";
const dashBoard = props => {
  return (
    <div>
      <CurrentAlarm />
    </div>
  );
};

export default dashBoard;
