// @flow
import React from "react";
import { Spin, Table } from "antd";
import { useTranslation } from "react-i18next";
import R from "ramda";
import { useAllDevicesSummary } from "./report";
export default () => {
  const [fetching, result] = useAllDevicesSummary();
  const { t } = useTranslation();
  const columns = [
    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "ip",
      key: "ip",
      dataIndex: "ip",
    },
    {
      title: "Alarm count",
      key: "alarmTimes",
      dataIndex: "alarmTimes",
    },
    {
      title: "alarmElapse",
      key: "alarmElapse",
      dataIndex: "alarmElapse",
      render: (t, r) => <span>{t} %</span>,
    },
    {
      title: "ackElapse",
      key: "ackElapse",
      dataIndex: "ackElapse",
      render: (t, r) => <span>{t} %</span>,
    },
    {
      title: "closeElapse",
      key: "closeElapse",
      dataIndex: "closeElapse",
      render: (t, r) => <span>{t} %</span>,
    },
  ];
  return (
    <div>
      <Spin spinning={fetching}>
        <h2>{t("normalRoutes.deviceSummary")}</h2>

        <Table dataSource={result} columns={columns} size="small" />
      </Spin>
    </div>
  );
};
