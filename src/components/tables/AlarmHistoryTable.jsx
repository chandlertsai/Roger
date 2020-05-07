// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { Table, Drawer, Tag, Button } from "antd";

import TableToolbar from "components/pureComponents/TableToolbar";
import { useTranslation } from "react-i18next";
import R from "ramda";

const alarmTable = () => {
  const [alarmKey, setAlarmKey] = useState();
  const [tableData, remove, update, query] = useFetch("alarmHistory");

  const { t } = useTranslation();

  const columns = [
    { title: t("alarmHistoryTable.index"), dataIndex: "index", key: "index" },
    {
      title: t("alarmHistoryTable.lastTS"),
      dataIndex: "lastTS",
      key: "lastTS",
    },

    {
      title: t("state"),
      dataIndex: "state",
      key: "state",
    },
    {
      title: t("alarmHistoryTable.ackUser"),
      dataIndex: "ackUser",
      key: "ackUser",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Button size="small" onClick={() => setAlarmKey(record.key)}>
            detail..
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table size="small" columns={columns} dataSource={tableData} />
    </div>
  );
};

export default alarmTable;
