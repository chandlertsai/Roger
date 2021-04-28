// @flow

import React, { useState, useEffect } from "react";
import R from "ramda";
import { useDispatch } from "react-redux";
import { Table, Drawer, Tag, message, Modal, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useFetch } from "apis/crud";
import { usePermission } from "apis/auth";
import axios from "axios";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import qs from "qs";
import UserForm from "components/forms/UserForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import {
  EditableFormRow,
  EditOperationCell,
} from "components/pureComponents/TableCells";

const permissionName = (key) =>
  R.compose(R.prop("name"), R.head, R.filter(R.propEq("key", key)));

// props type

const usersTable = () => {
  const [editingkey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update, query] = useFetch("users");
  const [isShowUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState({});
  const [deleteWarning, setDeleteWarning] = useState({
    show: false,
    groups: [],
  });
  const dispatch = useDispatch();
  const permissions = usePermission();
  const { t } = useTranslation();

  const isEditing = (key) => key === editingkey;

  const onEditing = (record) => {
    setEditingUser(record);
    setShowUserForm(true);
  };

  const onSubmit = (user) => {
    update(user);
    setShowUserForm(false);
  };

  const checkRemove = (body) => {
    axios
      .get("/apis/v1/read/groups", {
        params: { userKeys: body },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      })
      .then((res) => {
        const groups = res.data || [];
        if (groups.length > 0) {
          setDeleteWarning({ show: true, groups });
        }
      })

      .catch((err) => {
        if (err.response) {
          remove(body);
        }
      });
  };

  const handleModalOK = (e) => {
    setDeleteWarning({ groups: [], show: false });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectKeys) => setSelectedRowKeys(selectKeys),
  };

  const addDefaultUser = () => {
    const key = uniqueKey("user");
    onEditing({
      key: key,
      name: "",
      email: "",
      password: "1234",
      passwordTip: "",
    });
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("passwordTip"),
      dataIndex: "passwordTip",
      key: "passwordTip",
    },

    {
      title: t("permission"),
      dataIndex: "pkey",
      key: "pkey",
      render: (pKey) => (
        <span>
          <Tag color="geekblue" key="pKey">
            {permissionName(pKey)(permissions) || "None"}
          </Tag>
        </span>
      ),
    },
    {
      title: t("enable"),
      dataIndex: "enable",
      key: "enable",
      render: (text, record, index) => {
        const enable = R.propOr(false, "enable", record);
        return (
          <Switch
            checked={enable}
            onChange={(checked) => {
              const user = R.assoc("enable", checked, record);
              update(user);
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: (record) => ({
        style: { paddingTop: 0, paddingBottom: 0 },
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
      },
    },
  ];

  return (
    <div>
      <TableToolbar
        title={t("user.tableTitle")}
        selectedRowKeys={selectedRowKeys}
        onSearch={query}
        handlers={{
          addItem: addDefaultUser,
          removeSelectedItems: checkRemove,
          // onSearch: searchUser
        }}
        componentsText={{
          add: t("user.add"),
          remove: t("user.removeSelected"),
        }}
      />
      <Drawer
        title={t("user.edit")}
        visible={isShowUserForm}
        placement="right"
        footer={null}
        width="40%"
        onClose={() => setShowUserForm(false)}
      >
        <UserForm
          permissions={permissions}
          userData={editingUser}
          doSubmit={onSubmit}
        />
      </Drawer>
      <Modal
        visible={deleteWarning.show}
        title={t("error.deleteUserDeviceTitle")}
        onOk={handleModalOK}
        onCancel={handleModalOK}
      >
        <p>{t("error.deleteUserDevice")}</p>
        <ul>
          {deleteWarning.groups.map((group) => (
            <li key={group.key}>{group.name}</li>
          ))}
        </ul>
      </Modal>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default usersTable;
