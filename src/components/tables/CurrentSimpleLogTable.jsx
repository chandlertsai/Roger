// @flow
import React, { useState, useMemo } from "react";
import { useFetch } from "apis/crud";
import { Table, Drawer, Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import R from "ramda";

import { renderTimeCell, dateCompare } from "apis/utils";

const matchType = (type) => R.filter((i) => i.state == type);
const currentSimplelogTable = (props) => {
  const { alarms, onRowClick, filter } = props;

  const data = useMemo(() => {
    return filter ? matchType(filter)(alarms) : alarms;
  }, [alarms, filter]);

  const { t } = useTranslation();

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("ip"),
      dataIndex: "ip",
      key: "ip",
      sorter: (a, b) => a.ip.localeCompare(b.ip),
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
      sorter: (a, b) => dateCompare(a.lastAlarmTS, b.lastAlarmTS),
      defaultSortOrder: "descend",
    },
  ];

  return (
    <div>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        onRow={(record) => {
          return {
            onClick: (event) => {
              onRowClick(record);
            },
          };
        }}
      />
    </div>
  );
};

export default currentSimplelogTable;
