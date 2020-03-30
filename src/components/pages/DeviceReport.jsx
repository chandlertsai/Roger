// @flow
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  NormalDeviceCard,
  AlarmDeviceCard,
  AckDeviceCard
} from "components/pureComponents/AlarmCard";

import DeviceStatusTable from "components/tables/DeviceStatusTable";
import R from "ramda";
import { Button, Row, Col, Drawer, Radio } from "antd";

import { usePollingDevice } from "apis/device";
import { useLicense } from "apis/license";

export default () => {
  const [
    startPolling,
    stopPolling,
    isPolling,
    alarmDevices,
    ackDevices
  ] = usePollingDevice({
    interval: 1000
  });
  const { t } = useTranslation();
  const license = useLicense();
  const [currentRow, setCurrentRow] = useState({});
  const [tableFilter, setTableFilter] = useState("alarm");
  const [showAlarmControl, setShowAlarmControl] = useState(false);
  const [totalDevices, setTotalDevices] = useState("");
  const [licenseInfo, setLicenseInfo] = useState("");

  useEffect(() => {
    startPolling();
    axios
      .get("/apis/v1/count/devices")
      .then(R.pipe(R.prop("data"), R.prop("total"), setTotalDevices));

    return () => {
      stopPolling();
    };
  }, []);

  useEffect(() => {
    setLicenseInfo(
      t("device.avialable") + totalDevices + "/" + license.permitCount
    );
  }, [license, totalDevices]);

  const handleRowClick = record => {
    setShowAlarmControl(true);
    setCurrentRow(record);
  };

  const closeAlarmControlPanel = () => {
    setShowAlarmControl(false);
  };

  const getDeviceData = () => {
    switch (tableFilter) {
      case "alarm":
        return alarmDevices;
      case "ack":
        return ackDevices;
      default:
        return [];
    }
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <AlarmDeviceCard
            count={R.length(alarmDevices)}
            type="alarm"
            onClick={() => setTableFilter("alarm")}
          />
        </Col>

        <Col span={8}>
          <AckDeviceCard
            count={R.length(ackDevices)}
            onClick={() => setTableFilter("ack")}
          />
        </Col>

        <Col span={8}>
          <NormalDeviceCard
            count={totalDevices - R.length(alarmDevices) - R.length(ackDevices)}
            onClick={() => {}}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col span={12}>
          <Radio.Group
            onChange={e => setTableFilter(e.target.value)}
            value={tableFilter}
          >
            <Radio value="alarm">Alarm</Radio>
            <Radio value="ack">Ack</Radio>
          </Radio.Group>
        </Col>
        <Col span={8}>
          <span>{licenseInfo}</span>
        </Col>
        <Col span={4}>
          <Link to="/alarmReport">Alarm</Link>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DeviceStatusTable
            data={getDeviceData()}
            totalDevices={totalDevices}
          />
        </Col>
      </Row>
    </div>
  );
};
