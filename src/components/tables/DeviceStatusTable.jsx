// @flow

import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useFetch, useNameList, getName } from "apis/crud";
import { useDevices } from "apis/device";
import { useTranslation } from "react-i18next";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Row, Col, Popover, Button } from "antd";
import TableToolbar from "components/pureComponents/TableToolbar";
import { renderTimeCell } from "apis/utils";
import "./table.css";
import R from "ramda";

// props type
type Props = {
  data: mixed,
  totalDevices: number,
};

export default (props: Props) => {
  const { data, totalDevices } = props;
  const [currentDevice, setCurrentDevice] = useState(undefined);

  const { t } = useTranslation();

  const usersNameList = useNameList("users");
  const [vendorList, rv, uv] = useFetch("vendors");

  useDeepCompareEffect(() => {
    setCurrentDevice(undefined);
  }, [data]);

  const alarmColumns = [
    {
      title: t("alarm.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("state"),
      dataIndex: "state",
      key: "state",
    },
    {
      title: t("currentAlarmTable.message"),
      dataIndex: "message",
      key: "message",
    },
    {
      title: t("currentAlarmTable.lastAlarmTS"),
      dataIndex: "lastAlarmTS",
      key: "lastAlarmTS",
      render: renderTimeCell,
    },
  ];
  const columns = [
    {
      title: t("device.name"),
      dataIndex: "name",
      key: "name",
    },

    {
      title: t("ip"),
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: t("device.contact"),
      dataIndex: "userkey",
      key: "userkey",
      render: (userkey) => getName(userkey)(usersNameList),
    },
    {
      title: t("device.vendor"),
      dataIndex: "vendorkey",
      key: "vendorkey",
      render: (vkey) => {
        const vendor = R.find(R.propEq("key", vkey))(vendorList) || {};

        const content = (
          <div>
            <p>TEL:{vendor.phone}</p>
            <p>Email:{vendor.email}</p>
          </div>
        );
        return (
          <Popover title={vendor.name} content={content}>
            {vendor.name}
          </Popover>
        );
      },
    },

    {
      title: "#Alarm",
      key: "alarms",
      dataIndex: "alarms",

      render: (text, record) => {
        //const alarmCount = R.length(text || []);
        return <span>{R.length(text || [])}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Button size="small" onClick={() => setCurrentDevice(record.alarms)}>
            detail..
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table size="small" columns={columns} dataSource={data} />
        </Col>
      </Row>
      {currentDevice ? (
        <div>
          <Row>
            <Button onClick={() => setCurrentDevice(undefined)}>Close</Button>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Table
                size="small"
                columns={alarmColumns}
                dataSource={currentDevice}
              />
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
};
