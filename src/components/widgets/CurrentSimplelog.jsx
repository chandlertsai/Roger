// @flow
import React, { useState, useEffect } from "react";

import { usePollingAlarm, usePollingNormalDevice } from "apis/alarm";
import { Link } from "react-router-dom";
import {
  AckAlarmCard,
  AlarmCard,
  NormalDeviceCard,
} from "components/pureComponents/AlarmCard";
import AlarmControlPanel from "components/widgets/AlarmControlPanel";
import AlarmVoice from "components/widgets/AlarmVoice";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import R from "ramda";
import { Button, Row, Col, Drawer, Radio } from "antd";
import { useTranslation } from "react-i18next";

export default () => {
  const [startPolling, stopPolling, isPolling, alarms] = usePollingAlarm(
    {
      interval: 1000,
    },
    "message"
  );
  const { t } = useTranslation();

  const [currentRow, setCurrentRow] = useState({});
  const [tableFilter, setTableFilter] = useState("alarm");
  const [showAlarmControl, setShowAlarmControl] = useState(false);

  useEffect(() => {
    startPolling();

    return () => {
      stopPolling();
    };
  }, []);

  const handleRowClick = (record) => {
    setShowAlarmControl(true);
    setCurrentRow(record);
  };

  const closeAlarmControlPanel = () => {
    setShowAlarmControl(false);
  };

  return (
    <div>
      <Drawer
        title={t("simplelog.name")}
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
      {/* <Row gutter={[8, 8]}>
        <Col span={12}>
          <AlarmCard
            alarms={alarms}
            isMessage={true}
            onClick={() => setTableFilter("alarm")}
          />
        </Col>

        <Col span={12}>
          <AckAlarmCard
            alarms={alarms}
            isMessage={true}
            onClick={() => setTableFilter("ack")}
          />
        </Col>
      </Row> */}

      {/* <Row className="mt-3">
        <Col span={18}>
          <Radio.Group
            onChange={(e) => setTableFilter(e.target.value)}
            value={tableFilter}
          >
            <Radio value="">ALL</Radio>
            <Radio value="alarm">Alarm</Radio>
            <Radio value="ack">Ack</Radio>
            <Radio value="close">Close</Radio>
          </Radio.Group>
        </Col>
      </Row> */}
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
            title={t("simplelog.voiceTitle")}
            currentAlarms={R.filter(R.propEq("state", "alarm"), alarms)}
          />
        </Col>
      </Row>
    </div>
  );
};
