// @flow
import React, { useState } from "react";
import { Table } from "antd";
// props type
type Props = {
  alarmHistory: mixed,
};

export default (prop: Props) => {
  const { alarmHistory } = prop;
  const columns = [
    {
      title: "Alarm Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Normal time",
      dataIndex: "normalTime",
      key: "normalTime",
    },
    {
      title: "Total Ack time",
      dataIndex: "ackTime",
      key: "ackTime",
    },
    {
      title: "Total normal time",
      dataIndex: "normalTime",
      key: "normalTime",
    },
  ];
  return (
    <div>
      <Table dataSource={alarmHistory} size="small" columns={columns} />
    </div>
  );
};
