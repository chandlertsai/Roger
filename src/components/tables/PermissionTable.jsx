// @flow

import React, { useState, useEffect } from "react";
import R from "ramda";
import { useDispatch } from "react-redux";
import { Table, Drawer, Tag, message, Modal, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useFetch } from "apis/crud";
import { usePermission } from "apis/auth";
import PermissionForm from "components/forms/PermissionForm";
import axios from "axios";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import qs from "qs";
import TableToolbar from "components/pureComponents/TableToolbar";
import {
  EditableFormRow,
  EditOperationCell,
} from "components/pureComponents/TableCells";

// props type

const permissionTable = () => {
  const [editingkey, setEditingKey] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update, query] = useFetch("permission");
  const [isShowForm, setShowForm] = useState(false);
  const [editingPermission, setEditingPermission] = useState({});
  const [deleteWarning, setDeleteWarning] = useState({
    show: false,
    groups: [],
  });
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const isEditing = (key) => key === editingkey;

  const onEditing = (record) => {
    setEditingPermission(record);
    setShowForm(true);
  };

  const onSubmit = (permission) => {
    update(permission);
    setShowForm(false);
  };

  const checkRemove = (body) => {
    axios
      .get("/apis/v1/read/users", {
        params: { pkey: body },
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

  const addDefaultPermission = () => {
    const key = uniqueKey("permission");
    onEditing({
      key: key,
      name: "",
      abilities: [],
    });
  };

  const getColumns = () => {
    const nameCol = {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    };
    const actionCol = {
      title: t("edit"),
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
    };

    const abilities = R.map(
      (item) => ({
        title: t("menu." + item),
        dataIndex: "abilities",
        key: item,
        render: (text, record) => {
          const _abilities = R.propOr([], "abilities", record);
          return R.includes(item, _abilities) ? <span>Y</span> : <span>N</span>;
        },
      }),
      [
        "report",
        "userSetting",
        "deviceSetting",
        "alarmsSetting",
        "systemManagement",
      ]
    );
    return [nameCol, ...abilities, actionCol];
  };
  const columns = getColumns();

  return (
    <div>
      <TableToolbar
        title={t("permission")}
        selectedRowKeys={selectedRowKeys}
        onSearch={query}
        handlers={{
          addItem: addDefaultPermission,
          removeSelectedItems: checkRemove,
          // onSearch: searchUser
        }}
        componentsText={{
          add: t("permissionTable.add"),
          remove: t("permissionTable.remove"),
        }}
      />
      <h5>{t("permissionTable.relog")}</h5>
      <Drawer
        title={t("permission")}
        visible={isShowForm}
        placement="right"
        footer={null}
        width="40%"
        onClose={() => setShowForm(false)}
      >
        <PermissionForm permissions={editingPermission} doSubmit={onSubmit} />
      </Drawer>
      <Modal
        visible={deleteWarning.show}
        title={t("error.deletePermissionTitle")}
        onOk={handleModalOK}
        onCancel={handleModalOK}
      >
        <p>{t("error.deletePermission")}</p>
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

export default permissionTable;
