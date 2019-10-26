// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { usePermission } from "apis/auth";
import {
  EditableFormRow,
  EditOperationCell
} from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Drawer, Tag } from "antd";
import UserForm from "components/forms/UserForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import axios from "axios";
import R from "ramda";
const URL = "/apis/v1/users";

const permissionName = key =>
  R.compose(
    R.prop("name"),
    R.head,
    R.filter(R.propEq("key", key))
  );

// props type
type Props = {
  dispatch: Function
};
const usersTable = (props: Props) => {
  const [editingkey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update] = useFetch("users");
  const [isShowUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState({});
  const permissions = usePermission();

  const isEditing = key => key === editingkey;

  const onEditing = record => {
    setEditingUser(record);
    setShowUserForm(true);
  };

  const onSubmit = user => {
    update(user);
    setShowUserForm(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectKeys => setSelectedRowKeys(selectKeys)
  };

  const addDefaultUser = () => {
    const key = uniqueKey();
    onEditing({
      key: key,
      name: "輸入名稱",
      email: "請輸入電子郵件",
      password: "請輸入密碼"
    });
  };

  const columns = [
    {
      title: "名稱",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "密碼提示",
      dataIndex: "passwordTip",
      key: "passwordTip"
    },

    {
      title: "權限",
      dataIndex: "pkey",
      key: "pkey",
      render: pKey => (
        <span>
          <Tag color='geekblue' key='pKey'>
            {permissionName(pKey)(permissions) || "None"}
          </Tag>
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: record => ({
        style: { paddingTop: 0, paddingBottom: 0 }
      }),
      render: (text, record) => {
        const editing = isEditing(record.key);

        return (
          <EditOperationCell
            editing={editing}
            handlerSetEditing={onEditing}
            record={record}
          />
        );
      }
    }
  ];

  return (
    <div>
      <TableToolbar
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultUser,
          removeSelectedItems: remove
          // onSearch: searchUser
        }}
        componentsText={{
          add: "新增使用者",
          remove: "移除選取使用者"
        }}
      />
      <Drawer
        title='編輯使用者資料'
        visible={isShowUserForm}
        placement='right'
        footer={null}
        width='40%'
        onClose={() => setShowUserForm(false)}
      >
        <UserForm
          permissions={permissions}
          userData={editingUser}
          doSubmit={onSubmit}
        />
      </Drawer>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default usersTable;
