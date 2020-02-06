// ContractTable is a expand table used in the vendor table
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOperationCell } from "components/pureComponents/TableCells";
import R from "ramda";
const alarmConditionTable = record => {
  // key: uniqueKey("condition"),
  //   field: "",
  //     input: "",
  //       codition: "",
  //         not: false
  let columns = [
    { title: "輸入欄位", key: "input", dataIndex: "input" },
    { title: "執行條件", key: "condition", dataIndex: "condition" },
    { title: "比較對象", key: "operator", dataIndex: "operator" }
  ];

  console.log("alarm condition table props ", record);
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

  const { conditions } = record;

  return (
    <Table
      dataSource={conditions}
      columns={columns}
      size="small"
      rowSelection={rowSelection}
    />
  );
};

export default alarmConditionTable;
