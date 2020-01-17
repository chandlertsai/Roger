// @flow
import React, { useState } from "react";
import { useFetch } from "apis/crud";
import { Table, Drawer, Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import R from "ramda";

const currentAlarmTable = props => {
  const { alarms, onRowClick } = props;
  const { t } = useTranslation();

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("ip"),
      dataIndex: "ip",
      key: "ip"
    },
    {
      title: t("currentAlarmTable.message"),
      dataIndex: "message",
      key: "message"
    },
    {
      title: t("currentAlarmTable.time"),
      dataIndex: "time",
      key: "time"
    },

    {
      title: t("currentAlarmTable.state"),
      dataIndex: "state",
      key: "state"
    }
  ];

  return (
    <div>
      <Table
        size="small"
        columns={columns}
        dataSource={alarms}
        onRow={record => {
          return {
            onClick: event => {
              onRowClick(record);
            }
          };
        }}
      />
    </div>
  );
};

export default currentAlarmTable;
