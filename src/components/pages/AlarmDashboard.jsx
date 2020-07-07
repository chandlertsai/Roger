import React from "react";
import { Row, Col } from "antd";
import LineChartCard from "components/pureComponents/LineChartCard";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import CurrentAlarm from "components/widgets/CurrentAlarm";
import CurrentMessage from "components/widgets/CurrentSimplelog";
import { useTranslation } from "react-i18next";
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

export const TotalDashboard = () => {
  const { t } = useTranslation();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "16px" }}> {t("alarm.name")}</h2>
      <CurrentAlarm />

      <h2 style={{ marginBottom: "16px", marginTop: "16px" }}>
        {t("simplelog.name")}
      </h2>
      <CurrentMessage />
    </div>
  );
};

export default dashBoard;
