// @flow
import React, { useState, useEffect } from "react";

import { usePollingAlarm } from "apis/alarm";
import AlarmCard from "components/pureComponents/AlarmCard";
import AlarmControlPanel from "components/widgets/AlarmControlPanel";
import AlarmVoice from "components/widgets/AlarmVoice";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import { Button, Row, Col, Drawer } from "antd";

export default () => {
  const [startPolling, stopPolling, isPolling, alarms] = usePollingAlarm({
    interval: 1000
  });
  const [currentRow, setCurrentRow] = useState({});
  const [showAlarmControl, setShowAlarmControl] = useState(false);

  useEffect(() => {
    startPolling();
    return () => {
      stopPolling();
    };
  }, []);

  const handleRowClick = record => {
    setShowAlarmControl(true);
    setCurrentRow(record);
  };

  const closeAlarmControlPanel = () => {
    setShowAlarmControl(false);
  };

  return (
    <div>
      <Drawer
        title="設定 Alarm"
        visible={showAlarmControl}
        placement="right"
        footer={null}
        destroyOnClose={true}
        width="40%"
        onClose={() => setShowAlarmControl(false)}
      >
        <AlarmControlPanel
          alarm={currentRow}
          onClose={closeAlarmControlPanel}
        />
      </Drawer>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <AlarmCard alarms={alarms} />
        </Col>
        <Col span={6}>
          <AlarmCard alarms={alarms} type="read" />
        </Col>
        <Col span={6}>
          <AlarmCard alarms={alarms} type="ack" />
        </Col>
        <Col span={6}>
          <AlarmCard alarms={alarms} type="close" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CurrentAlarmTable alarms={alarms} onRowClick={handleRowClick} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AlarmVoice currentAlarms={alarms} />
        </Col>
      </Row>
    </div>
  );
};
