import React, { useEffect } from "react";
import { Row, Col } from "antd";
import LineChartCard from "components/pureComponents/LineChartCard";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import CurrentAlarm from "components/widgets/CurrentAlarm";
import CurrentMessage from "components/widgets/CurrentSimplelog";
import { useTranslation } from "react-i18next";
import { usePollingAlarm } from "apis/alarm";
import R from "ramda";
import AlarmVoice from "components/widgets/AlarmVoice";
const isAlarm = R.propEq("state", "alarm");
const filterAlarm = R.filter(isAlarm);
const dashBoard = (props) => {
  const [startPolling, stopPolling, isPolling, alarms] = usePollingAlarm({
    interval: 1000,
  });
  useEffect(() => {
    startPolling();

    return () => {
      stopPolling();
    };
  }, []);
  return (
    <div>
      <CurrentAlarm alarms={alarms} />
      <AlarmVoice alarms={filterAlarm(alarms)} />
    </div>
  );
};

export const MessageDashboard = (props) => {
  const [startPolling, stopPolling, isPolling, alarms] = usePollingAlarm(
    {
      interval: 1000,
    },
    "message",
    true
  );

  useEffect(() => {
    startPolling();

    return () => {
      stopPolling();
    };
  }, []);

  return (
    <div>
      <CurrentMessage alarms={alarms} />
      <AlarmVoice />
    </div>
  );
};

export const TotalDashboard = () => {
  const { t } = useTranslation();
  const [startPolling, stopPolling, isPolling, alarms] = usePollingAlarm({
    interval: 1000,
  });
  const [
    startPollingMessage,
    stopPollingMessage,
    _,
    messages,
  ] = usePollingAlarm(
    {
      interval: 1000,
    },
    "message",
    true
  );

  useEffect(() => {
    startPolling();
    startPollingMessage();

    return () => {
      stopPolling();
      stopPollingMessage();
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "16px" }}> {t("alarm.name")}</h2>
      <CurrentAlarm alarms={alarms} />

      <h2 style={{ marginBottom: "16px", marginTop: "16px" }}>
        {t("simplelog.name")}
      </h2>
      <CurrentMessage alarms={messages} />
      <AlarmVoice alarms={filterAlarm(alarms)} />
    </div>
  );
};

export default dashBoard;
