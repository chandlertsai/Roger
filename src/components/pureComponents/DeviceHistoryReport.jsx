// @flow
import React, { useState } from "react";

import { Row, Col, Typography, Statistic, Button } from "antd";
import AlarmHistoryReport from "components/pureComponents/AlarmHistoryReport";
import "../basic.less";
import R from "ramda";
type tProp = {
  deviceInfo: { name: String, ip: string },
  alarmHistoryInfo: mixed,
  handleCloseReport: Function,
};

const defaultProp = {
  deviceInfo: {
    name: "Default Device",
    ip: "192.168.99.99",
  },
  alarmHistoryInfo: [
    {
      totalAlarmElapse: 0,
      totalAckElapse: 0,
      totalCloseElapse: 0,
      alarmName: "Default Alarm",
      alarmMessage: "Default message of alarm",
    },
  ],
};

export default (prop: tProp) => {
  const { deviceInfo, alarmHistoryInfo, handleClose } = R.mergeLeft(
    prop,
    defaultProp
  );
  return (
    <div className="my-card">
      <Row>
        <Col span={8}>
          <Typography.Title level={3}>{deviceInfo.name}</Typography.Title>
        </Col>
        <Col span={8}>
          <Typography.Title level={3}>{deviceInfo.ip}</Typography.Title>
        </Col>
        <Col span={4} offset={4}>
          <Button onClick={handleClose}>close</Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AlarmHistoryReport alarmHistoryInfo={alarmHistoryInfo} />
        </Col>
      </Row>
    </div>
  );
};
