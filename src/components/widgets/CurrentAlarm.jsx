// @flow
import React, { useState, useEffect } from "react";

import { usePollingAlarm, usePollingNormalDevice } from "apis/alarm";
import {
  AckAlarmCard,
  AlarmCard,
  NormalDeviceCard
} from "components/pureComponents/AlarmCard";
import AlarmControlPanel from "components/widgets/AlarmControlPanel";
import AlarmVoice from "components/widgets/AlarmVoice";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import R from "ramda";
import { Button, Row, Col, Drawer, Radio } from "antd";

export default () => {
  const [startPolling, stopPolling, isPolling, alarms] = usePollingAlarm({
    interval: 1000
  });
  const [
    startPollingND,
    stopPollingND,
    isPollingND,
    normalDevices
  ] = usePollingNormalDevice({
    interval: 1000
  });
  const [currentRow, setCurrentRow] = useState({});
  const [tableFilter, setTableFilter] = useState("alarm");
  const [showAlarmControl, setShowAlarmControl] = useState(false);

  useEffect(() => {
    startPolling();
    startPollingND();
    return () => {
      stopPolling();
      stopPollingND();
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
        <Col span={8}>
          <AlarmCard
            alarms={alarms}
            type="alarm"
            onClick={() => setTableFilter("alarm")}
          />
        </Col>

        <Col span={8}>
          <AckAlarmCard alarms={alarms} onClick={() => setTableFilter("ack")} />
        </Col>

        <Col span={8}>
          <NormalDeviceCard devices={normalDevices} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Radio.Group
          onChange={e => setTableFilter(e.target.value)}
          value={tableFilter}
        >
          <Radio value="">ALL</Radio>
          <Radio value="alarm">Alarm</Radio>
          <Radio value="ack">Ack</Radio>
          <Radio value="close">Close</Radio>
        </Radio.Group>
      </Row>
      <Row>
        <Col span={24}>
          <CurrentAlarmTable
            alarms={alarms}
            onRowClick={handleRowClick}
            filter={tableFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AlarmVoice
            currentAlarms={R.filter(R.propEq("state", "alarm"), alarms)}
          />
        </Col>
      </Row>
    </div>
  );
};
