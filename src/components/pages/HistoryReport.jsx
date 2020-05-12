import React, { useState, useEffect } from "react";
import { Select, Spin, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { useFetch } from "apis/crud";
import { useDebounce } from "apis/utils";
import { useTranslation } from "react-i18next";
import { useDeviceReport } from "./report";
import AllDeviceSummary from "components/pages/AllDevicesSummaryReport";

import axios from "axios";
import R from "ramda";
import AlarmHistoryTable from "components/tables/AlarmHistoryTable";
import DeviceHistoryReport from "components/pureComponents/DeviceHistoryReport";

const getDeviceKey = R.prop("value");
export default () => {
  const [tableData, remove, update, query] = useFetch("devices");
  const [searchText, setSearchText] = useState("");
  const [currentDevice, setCurrentDevice] = useState();
  const [reportVisiable, setReportVisiable] = useState(false);
  const {
    alarmHistory,
    deviceInfo,
    fetching,
    fetchHistory,
  } = useDeviceReport();
  const { t } = useTranslation();
  const handleChange = (v) => {
    if (R.isNil(v)) return;
    setCurrentDevice(v);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Select
            labelInValue
            showSearch
            value={currentDevice}
            placeholder={t("device.selectDevice")}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={query}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {R.map((v) => (
              <Select.Option key={v.key}>{v.name + " | " + v.ip}</Select.Option>
            ))(tableData || [])}
          </Select>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
              const key = getDeviceKey(currentDevice);
              fetchHistory(key).then(() => setReportVisiable(true));
            }}
            loading={fetching}
            disabled={currentDevice ? false : true}
          >
            {t("alarmHistoryTable.report")}
          </Button>
        </Col>
        <Col>
          <Link to="/deviceSummary"> {t("alarmHistoryTable.allDevices")}</Link>
        </Col>
      </Row>

      {reportVisiable ? (
        <div>
          <DeviceHistoryReport
            handleClose={() => setReportVisiable(false)}
            deviceInfo={deviceInfo}
            alarmHistoryInfo={alarmHistory}
          />
        </div>
      ) : null}
    </div>
  );
};
