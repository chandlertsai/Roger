// @flow
import React from "react";
import { Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    },
    {
      title: t("ip"),
      key: "ip",
      dataIndex: "ip",
    },
    {
      title: t("alarmHistoryTable.alarmTimes"),
      key: "alarmTimes",
      dataIndex: "alarmTimes",
    },
    {
      title: t("alarmHistoryTable.totalAlarmElapse"),
      key: "alarmElapse",
      dataIndex: "alarmElapse",
      render: (t, r) => <span>{t} %</span>,
    },
    {
      title: t("alarmHistoryTable.totalAckElapse"),
      key: "ackElapse",
      dataIndex: "ackElapse",
      render: (t, r) => <span>{t} %</span>,
    },
    {
      title: t("alarmHistoryTable.totalCloseElapse"),
      key: "closeElapse",
      dataIndex: "closeElapse",
      render: (t, r) => <span>{t} %</span>,
    },
  ];
  return (
    <div>
      <Spin spinning={fetching}>
        <h2>{t("normalRoutes.deviceSummary")}</h2>
        <Link to="/historyReport">{t("back")}</Link>
        <Table dataSource={result} columns={columns} size="small" />
      </Spin>
    </div>
  );
};
