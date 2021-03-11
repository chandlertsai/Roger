// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { uniqueKey } from "apis/utils";
import { Table, Drawer, Tag, Button } from "antd";
import { useTranslation } from "react-i18next";
import R from "ramda";

const alarmSelectTable = (props) => {
  const [tableData, remove, update, query] = useFetch("alarms", {
    params: { source: "cacti" },
  });
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { device, onChanged } = props;

  useEffect(() => {
    const keys = R.propOr([], "alarms", device);
    setSelectedKeys(keys);
    onChanged(keys);
  }, [device]);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (keys) => {
      setSelectedKeys(keys);
      onChanged(device, keys);
    },
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },

    {
      title: t("alarm.source"),
      dataIndex: "source",
      key: "source",
    },

    {
      title: t("alarm.pollingInterval"),
      dataIndex: "pollingInterval",
      key: "pollingInterval",
    },

    {
      title: t("alarm.message"),
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <div>
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default alarmSelectTable;
