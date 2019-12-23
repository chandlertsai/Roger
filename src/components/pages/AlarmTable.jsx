// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { Table, Drawer, Tag, Button } from "antd";
import AlarmForm from "components/forms/AlarmForm";
import AlarmConditionTable from "components/pages/AlarmConditionTable";
import TableToolbar from "components/pureComponents/TableToolbar";

import R from "ramda";

const alarmTable = props => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update] = useFetch("alarms");
  const [isShowAlarmForm, setShowAlarmForm] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState({});

  const onEditing = record => {
    setEditingAlarm(record);
    setShowAlarmForm(true);
  };

  const onSubmit = vendor => {
    const newData = R.omit(["_id"], vendor);
    update(newData);
    setShowAlarmForm(false);
    console.log("alarmtable onsubmit update ", newData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectKeys => setSelectedRowKeys(selectKeys)
  };

  const addDefaultAlarm = () => {
    const key = uniqueKey("alarm");
    onEditing({
      key: key,
      name: "",
      source: "cacti",
      pollingInterval: 10,
      triggerType: "once",
      message: "有錯誤發生",
      conditions: []
    });
  };

  const columns = [
    {
      title: "名稱",
      dataIndex: "name",
      key: "name"
    },

    {
      title: "來源",
      dataIndex: "source",
      key: "source"
    },

    {
      title: "輪詢時間  ",
      dataIndex: "pollingInterval",
      key: "pollingInterval"
    },
    {
      title: "觸發類型    ",
      dataIndex: "triggerType",
      key: "triggerType"
    },
    {
      title: "報警訊息 ",
      dataIndex: "message",
      key: "message"
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: record => ({
        style: { paddingTop: 0, paddingBottom: 0 }
      }),
      render: (text, record) => (
        <EditOperationCell handlerSetEditing={onEditing} record={record} />
      )
    }
  ];

  return (
    <div>
      <TableToolbar
        title="報警"
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultAlarm,
          removeSelectedItems: remove
          // onSearch: searchUser
        }}
        componentsText={{
          add: "新增",
          remove: "移除選取項目"
        }}
      />

      <Drawer
        title="編輯報警資料"
        visible={isShowAlarmForm}
        placement="right"
        footer={null}
        destroyOnClose={true}
        width="45%"
        onClose={() => setShowAlarmForm(false)}
      >
        <AlarmForm doSubmit={onSubmit} alarm={editingAlarm} />
      </Drawer>
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        expandedRowRender={AlarmConditionTable}
        dataSource={tableData}
      />
    </div>
  );
};

export default alarmTable;
