// @flow

import React, { useState, useEffect } from "react";
import { Table, Drawer, Tag, Popover, Row, Col } from "antd";

import { useFetch, useFetchFields, getName } from "apis/crud";
import { useLicense } from "apis/license";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";

import { EditOperationCell } from "components/pureComponents/TableCells";
import TableToolbar from "components/pureComponents/TableToolbar";
import Hide from "components/utils/Hide";
import {
  UsersSimpleTable,
  DevicesSimpleTable,
} from "components/tables/SimpleTables";
import GroupForm from "components/forms/GroupForm";

import R from "ramda";

// props type
type Props = {
  dispatch: Function,
};

const getKeyIncludes = (keys) => R.filter((i) => R.includes(i.key, keys || []));

const groupsTable = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isShowGroupForm, setShowGroupForm] = useState(false);
  const [groupsData, remove, update, query] = useFetch("groups");
  const [editingGroup, setEditingGroup] = useState({});
  const [detailGroup, setDetailGroup] = useState({});
  const [isShowDetail, setShowDetail] = useState(false);

  const users = useFetchFields("users")(["name", "key", "email"]);
  const devices = useFetchFields("devices")(["name", "key", "ip"]);

  useEffect(() => {
    setShowDetail(false);
  }, [groupsData]);
  const onEditing = (record) => {
    setEditingGroup(record);
    setShowGroupForm(true);
  };

  const onDetail = (record) => {
    setDetailGroup(record);
    setShowDetail(true);
  };

  const onSubmit = (group) => {
    console.log("Group table onSubmit ", group);
    update(group);
    setShowGroupForm(false);
    setEditingGroup({});
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectKeys) => setSelectedRowKeys(selectKeys),
  };

  const addDefaultGroup = () => {
    const key = uniqueKey("group");
    onEditing({
      key: key,
      name: "輸入名稱",
    });
  };

  const columns = [
    {
      title: "群組名稱",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      onCell: (record) => ({
        style: { paddingTop: 0, paddingBottom: 0 },
      }),
      render: (text, record) => (
        <EditOperationCell
          handlerSetEditing={onEditing}
          record={record}
          handleDetail={onDetail}
        />
      ),
    },
  ];

  return (
    <div>
      <TableToolbar
        title="群組管理"
        selectedRowKeys={selectedRowKeys}
        onSearch={query}
        handlers={{
          addItem: addDefaultGroup,
          removeSelectedItems: remove,
          // onSearch: searchUser
        }}
        componentsText={{
          add: "新增群組",
          remove: "移除選取群組",
        }}
      />
      <Drawer
        title="編輯群組資料"
        visible={isShowGroupForm}
        placement="bottom"
        footer={null}
        height="80%"
        onClose={() => setShowGroupForm(false)}
      >
        <GroupForm group={editingGroup} doSubmit={onSubmit} />
      </Drawer>
      <Row gutter={15}>
        <Col span={8}>
          <Table
            size="small"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={groupsData}
          />
        </Col>
        <Hide show={isShowDetail}>
          <Col span={8}>
            <UsersSimpleTable
              data={getKeyIncludes(detailGroup.userKeys)(users)}
            />
          </Col>
          <Col span={8}>
            <DevicesSimpleTable
              data={getKeyIncludes(detailGroup.deviceKeys)(devices)}
            />
          </Col>
        </Hide>
      </Row>
    </div>
  );
};

export default groupsTable;
