// @flow

import React, { useState, useEffect } from "react";
import { useFetch, useNameList, getName } from "apis/crud";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Drawer, Tag, Popover } from "antd";
import DeviceForm from "components/forms/DeviceForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import { useLicense } from "apis/license";

import R from "ramda";

// props type
type Props = {
  dispatch: Function
};

//  <option value='NormalNetwork'>一般網路設備</option>
//           <option value='Monitor'>數據監控設備</option>
//           <option value='SimpleDevice'>簡易資料設備</option>

const devicesTable = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update] = useFetch("devices");
  const [isShowUserForm, setShowUserForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState({});
  const license = useLicense();
  const [licenseInfo, setLicenseInfo] = useState("");
  const usersNameList = useNameList("users");
  const [vendorList, rv, uv] = useFetch("vendors");

  useEffect(() => {
    setLicenseInfo("可用裝置: " + tableData.length + "/" + license.permitCount);
  }, [licenseInfo, tableData]);

  const onEditing = record => {
    setEditingDevice(record);
    setShowUserForm(true);
  };

  const onSubmit = device => {
    update(device);
    setShowUserForm(false);
    console.log(device);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectKeys => setSelectedRowKeys(selectKeys)
  };

  const addDefaultDevice = () => {
    const key = uniqueKey();
    onEditing({
      key: key,
      name: "輸入名稱",
      ip: "請輸入ip"
    });
  };

  const deviceType = {
    NormalNetwork: "一般網路設備",
    Monitor: "數據監控設備",
    SimpleDevice: "簡易資料設備"
  };

  const columns = [
    {
      title: "名稱",
      dataIndex: "name",
      key: "name"
    },

    {
      title: "類型",
      dataIndex: "type",
      key: "type",
      render: t => (
        <span>
          <Tag color='geekblue' key='t'>
            {deviceType[t] || "None"}
          </Tag>
        </span>
      )
    },

    {
      title: "IP位置",
      dataIndex: "ip",
      key: "ip"
    },
    {
      title: "管理員",
      dataIndex: "userkey",
      key: "userkey",
      render: userkey => getName(userkey)(usersNameList)
    },
    {
      title: "供應商資料",
      dataIndex: "vendorkey",
      key: "vendorkey",
      render: vkey => {
        const vendor = R.find(R.propEq("key", vkey))(vendorList) || {};

        const content = (
          <div>
            <p>電話:{vendor.phone}</p>
            <p>Email:{vendor.email}</p>
          </div>
        );
        return (
          <Popover title={vendor.name} content={content}>
            {vendor.name}
          </Popover>
        );
      }
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
        title='裝置管理'
        info={licenseInfo}
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultDevice,
          removeSelectedItems: remove
          // onSearch: searchUser
        }}
        componentsText={{
          add: "新增裝置",
          remove: "移除選取裝置"
        }}
      />
      <Drawer
        title='編輯裝置資料'
        visible={isShowUserForm}
        placement='right'
        footer={null}
        width='40%'
        onClose={() => setShowUserForm(false)}
      >
        <DeviceForm
          device={editingDevice}
          doSubmit={onSubmit}
          users={usersNameList}
          vendors={vendorList}
        />
      </Drawer>
      <Table
        size='small'
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default devicesTable;
