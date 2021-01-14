// @flow
import React, { useState, useEffect } from "react";

import { usePollingAlarm } from "apis/alarm";
import { Link } from "react-router-dom";
import {
  AckAlarmCard,
  AlarmCard,
  NormalDeviceCard,
} from "components/pureComponents/AlarmCard";
import AlarmControlPanel from "components/widgets/AlarmControlPanel";
import AlarmVoice from "components/widgets/AlarmVoice";
import CurrentSimpleLogTable from "components/tables/CurrentSimpleLogTable";
import R from "ramda";
import { Button, Row, Col, Drawer, Radio } from "antd";
import { useTranslation } from "react-i18next";

// for testing
import { useDispatch } from "react-redux";
import { setSimplelogLastTS } from "actions/appState";
import { MINTIME } from "reducers/storeUtils";

export default () => {
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

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentRow, setCurrentRow] = useState({});
  const [tableFilter, setTableFilter] = useState("alarm");
  const [showAlarmControl, setShowAlarmControl] = useState(false);

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
      <Row>
        <Button onClick={() => dispatch(setSimplelogLastTS(MINTIME))}>
          Reset ts
        </Button>
      </Row>
      <Row>
        <Col span={24}>
          <CurrentSimpleLogTable
            alarms={alarms}
            onRowClick={handleRowClick}
            filter={tableFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AlarmVoice title={t("simplelog.voiceTitle")} />
        </Col>
      </Row>
    </div>
  );
};
