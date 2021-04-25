// @flow
import React from "react";
import { Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { dateCompare } from "apis/utils";
import R from "ramda";
import { useAllDevicesSummary } from "./report";
export default () => {
  const [fetching, result] = useAllDevicesSummary();
  const { t } = useTranslation();
  const columns = [
    {
      title: t("name"),
      key: "name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("ip"),
      key: "ip",
      dataIndex: "ip",
      sorter: (a, b) => a.ip.localeCompare(b.ip),
    },
    {
      title: t("alarmHistoryTable.alarmTimes"),
      key: "alarmTimes",
      dataIndex: "alarmTimes",
      sorter: (a, b) => dateCompare(a.alarmTimes, b.alarmTimes),
    },
    {
      title: t("alarmHistoryTable.totalAlarmElapse"),
      key: "alarmElapse",
      dataIndex: "alarmElapse",
      sorter: (a, b) => a.alarmElapse - b.alarmElapse,
      render: (t, r) => <span>{t} %</span>,
    },
    {
      title: t("alarmHistoryTable.totalAckElapse"),
      key: "ackElapse",
      dataIndex: "ackElapse",
      sorter: (a, b) => a.ackElapse - b.ackElapse,
      render: (t, r) => <span>{t} %</span>,
    },
    {
      title: t("alarmHistoryTable.totalCloseElapse"),
      key: "closeElapse",
      dataIndex: "closeElapse",
      sorter: (a, b) => a.closeElapse - b.closeElapse,
      render: (t, r) => <span>{t} %</span>,
    },
  ];
  return (
    <div>
      <Spin spinning={fetching}>
        <h2>{t("privateRoutes.deviceSummary")}</h2>
        <Table dataSource={result} columns={columns} size="small" />
      </Spin>
    </div>
  );
};
