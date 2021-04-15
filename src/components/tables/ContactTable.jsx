// ContractTable is a expand table used in the vendor table
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { useTranslation } from "react-i18next";
import R from "ramda";
const contactTable = (props) => {
  const { updateView, contacts, onEditing = () => {}, rowSelection } = props;
  const { t } = useTranslation();
  let columns = [
    { title: t("name"), key: "name", dataIndex: "name" },
    { title: t("title"), key: "title", dataIndex: "title" },
    { title: t("sex"), key: "sex", dataIndex: "sex" },
    { title: t("email"), key: "email", dataIndex: "email" },
    { title: t("phone"), key: "phone", dataIndex: "phone" },
    { title: t("mobile"), key: "mobile", dataIndex: "mobile" },
    { title: t("fax"), key: "fax", dataIndex: "fax" },
  ];

  if (R.is(Function)(onEditing)) {
    columns.push({
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: (record) => ({
        style: { paddingTop: 0, paddingBottom: 0 },
      }),
      render: (text, record) => (
        <EditOperationCell handlerSetEditing={onEditing} record={record} />
      ),
    });
  }

  return (
    <Table
      dataSource={contacts}
      columns={columns}
      size="small"
      rowSelection={rowSelection}
    />
  );
};

export default contactTable;
