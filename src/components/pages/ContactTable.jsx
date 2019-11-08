// ContractTable is a expand table used in the vendor table
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOperationCell } from "components/pureComponents/TableCells";
import R from "ramda";
const contactTable = record => {
  let columns = [
    { title: "姓名", key: "name", dataIndex: "name" },
    { title: "職稱", key: "title", dataIndex: "title" },
    { title: "性別 ", key: "sex", dataIndex: "sex" },
    { title: "Email", key: "email", dataIndex: "email" },
    { title: "電話", key: "phone", dataIndex: "phone" },
    { title: "行動電話", key: "mobile", dataIndex: "mobile" },
    { title: "傳真", key: "fax", dataIndex: "fax" }
  ];

  console.log("contacttable props ", record);
  const { onEditing, rowSelection } = record;

  if (R.is(Function)(onEditing)) {
    columns.push({
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: record => ({
        style: { paddingTop: 0, paddingBottom: 0 }
      }),
      render: (text, record) => (
        <EditOperationCell handlerSetEditing={onEditing} record={record} />
      )
    });
  }

  const { contacts } = record;

  return (
    <Table
      dataSource={contacts}
      columns={columns}
      size='small'
      rowSelection={rowSelection}
    />
  );
};

export default contactTable;
