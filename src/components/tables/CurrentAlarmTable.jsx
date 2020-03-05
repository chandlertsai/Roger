// @flow
import React, { useState } from "react";
import { useFetch } from "apis/crud";
import { Table, Drawer, Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import R from "ramda";

import { renderTimeCell } from "apis/utils";

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
      title: t("currentAlarmTable.state"),
      dataIndex: "state",
      key: "state"
    },
    {
      title: t("currentAlarmTable.lastAlarmTS"),
      dataIndex: "lastAlarmTS",
      key: "lastAlarmTS",
      render: renderTimeCell
    },
    {
      title: t("currentAlarmTable.lastCloseTS"),
      dataIndex: "lastCloseTS",
      key: "lastCloseTS",
      render: renderTimeCell
    },
    {
      title: t("currentAlarmTable.lastAckTS"),
      dataIndex: "lastAckTS",
      key: "lastAckTS",
      render: renderTimeCell
    },
    {
      title: t("currentAlarmTable.lastAckUser"),
      dataIndex: "lastAckUser",
      key: "lastAckUser"
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
