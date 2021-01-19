// @flow
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import {
  AckAlarmCard,
  AlarmCard,
  NormalDeviceCard,
} from "components/pureComponents/AlarmCard";
import AlarmControlPanel from "components/widgets/AlarmControlPanel";
import CurrentAlarmTable from "components/tables/CurrentAlarmTable";
import R from "ramda";
import { Button, Row, Col, Drawer, Radio } from "antd";
import { useTranslation } from "react-i18next";

export default (props) => {
  const { alarms = [] } = props;
  const [currentRow, setCurrentRow] = useState({});
  const [tableFilter, setTableFilter] = useState("alarm");
  const [showAlarmControl, setShowAlarmControl] = useState(false);
  const { t } = useTranslation();

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
        title={t("alarm.name")}
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
        <Col span={12}>
          <AlarmCard
            alarms={alarms}
            type="alarm"
            onClick={() => setTableFilter("alarm")}
          />
        </Col>

        <Col span={12}>
          <AckAlarmCard alarms={alarms} onClick={() => setTableFilter("ack")} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col span={18}>
          <Radio.Group
            onChange={(e) => setTableFilter(e.target.value)}
            value={tableFilter}
          >
            <Radio value="">{t("alarmState.all")}</Radio>
            <Radio value="alarm">{t("alarmState.alarm")}</Radio>
            <Radio value="ack">{t("alarmState.ack")}</Radio>
            <Radio value="close">{t("alarmState.close")}</Radio>
          </Radio.Group>
        </Col>
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
    </div>
  );
};
