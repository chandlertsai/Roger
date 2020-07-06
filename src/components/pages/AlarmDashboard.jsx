import React from "react";
import { Row, Col } from "antd";
import LineChartCard from "components/pureComponents/LineChartCard";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import CurrentAlarm from "components/widgets/CurrentAlarm";
import CurrentMessage from "components/widgets/CurrentSimplelog";
const dashBoard = (props) => {
  return (
    <div>
      <CurrentAlarm />
    </div>
  );
};

export const MessageDashboard = (props) => (
  <div>
    <CurrentMessage />
  </div>
);

export default dashBoard;
