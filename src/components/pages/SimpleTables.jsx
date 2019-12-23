// @flow
import React from "react";
import { Table } from "antd";

type tProps = {
  data: Array<mixed>,
  rowSelection?: mixed
};

export const UsersSimpleTable = (props: tProps) => {
  const { data, rowSelection } = props;
  const columns = [
    {
      title: "使用者名稱",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    }
  ];

  return (
    <Table
      dataSource={data}
      size="small"
      bordered
      rowSelection={rowSelection}
      columns={columns}
    />
  );
};

export const DevicesSimpleTable = (props: tProps) => {
  const { data, rowSelection } = props;
  const columns = [
    {
      title: "裝置名稱",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip"
    }
  ];

  return (
    <Table
      dataSource={data}
      size="small"
      bordered
      rowSelection={rowSelection}
      columns={columns}
    />
  );
};
