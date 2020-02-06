// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { Table, Drawer, Tag, Button } from "antd";
import AlarmForm from "components/forms/AlarmForm";
import AlarmConditionTable from "components/tables/AlarmConditionTable";
import TableToolbar from "components/pureComponents/TableToolbar";
import { useTranslation } from "react-i18next";
import R from "ramda";

const alarmTable = props => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update, query] = useFetch("alarms");
  const [isShowAlarmForm, setShowAlarmForm] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState({});
  const { t } = useTranslation();
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
      title: t("name"),
      dataIndex: "name",
      key: "name"
    },

    {
      title: t("alarm.source"),
      dataIndex: "source",
      key: "source"
    },

    {
      title: t("alarm.pollingInterval"),
      dataIndex: "pollingInterval",
      key: "pollingInterval"
    },

    {
      title: t("alarm.message"),
      dataIndex: "message",
      key: "message"
    },
    {
      title: t("alarm.triggerDevState"),
      dataIndex: "triggerDeviceStatus",
      key: "triggerDeviceStatus"
    },

    {
      title: t("alarm.releaseDevState"),
      dataIndex: "releaseDeviceStatus",
      key: "releaseDeviceStatus"
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
        title={t("alarm.name")}
        selectedRowKeys={selectedRowKeys}
        onSearch={query}
        handlers={{
          addItem: addDefaultAlarm,
          removeSelectedItems: remove
          // onSearch: searchUser
        }}
        componentsText={{
          add: t("alarm.add"),
          remove: t("alarm.removeSelected")
        }}
      />

      <Drawer
        title={t("alarm.edit")}
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
        dataSource={tableData}
      />
    </div>
  );
};

export default alarmTable;
