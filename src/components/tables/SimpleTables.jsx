// @flow
import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

type tProps = {
  data: Array<mixed>,
  rowSelection?: mixed,
};

export const UsersSimpleTable = (props: tProps) => {
  const { data, rowSelection } = props;
  const { t } = useTranslation();
  const columns = [
    {
      title: t("group.userName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
    },
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
  const { t } = useTranslation();
  const columns = [
    {
      title: t("group.deviceName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
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
