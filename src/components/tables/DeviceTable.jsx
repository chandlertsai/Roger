// @flow

import React, { useState, useEffect } from "react";
import { useFetch, useNameList, getName } from "apis/crud";
import { useTranslation } from "react-i18next";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Drawer, Tag, Popover, Modal, Switch, Button } from "antd";
import DeviceForm from "components/forms/DeviceForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import AlarmSelectTable from "components/tables/AlarmSelectTable";
import { useLicense } from "apis/license";
import { useSelector } from "react-redux";
import { loadingState } from "reducers/storeUtils";
import qs from "qs";
import R from "ramda";
import axios from "axios";

// props type
type Props = {
  dispatch: Function,
};

// "device": {
//   "name": "Device name",
//   "tableTitle": "裝置管理",
//   "add": "新增裝置",
//   "removeSelected": "移除選取裝置",
//   "avialable": "可用裝置",
//   "contact":"管理員",
//   "vendor":"供應商"
// },
//  <option value='NormalNetwork'>一般網路設備</option>
//           <option value='Monitor'>數據監控設備</option>
//           <option value='SimpleDevice'>簡易資料設備</option>

const devicesTable = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update, query] = useFetch("devices");
  const [isShowUserForm, setShowUserForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState({});
  const [showAlarmSelectTable, setShowAlarmSelectTable] = useState(false);

  const [deleteWarning, setDeleteWarning] = useState({
    show: false,
    groups: [],
  });
  const [selectedAlarms, setSelectdAlarms] = useState([]);
  const license = useLicense();
  const { t } = useTranslation();
  const [licenseInfo, setLicenseInfo] = useState("");
  const usersNameList = useNameList("users");
  const [vendorList, rv, uv] = useFetch("vendors");
  const confirmLoading = useSelector(loadingState);
  useEffect(() => {
    const length = tableData ? tableData.length : 0;
    setLicenseInfo(t("device.avialable") + length + "/" + license.permitCount);
  }, [license, tableData]);

  const onEditing = (record) => {
    setEditingDevice(record);
    setShowUserForm(true);
  };

  const onSubmit = (device) => {
    update(device);
    setShowUserForm(false);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectKeys) => setSelectedRowKeys(selectKeys),
  };

  const addDefaultDevice = () => {
    const key = uniqueKey("device");
    onEditing({
      key: key,
      name: "",
      ip: "",
    });
  };

  const checkRemove = (body) => {
    axios
      .get("/apis/v1/read/groups", {
        params: { deviceKeys: body },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      })
      .then((res) => {
        const groups = res.data || [];
        if (groups.length > 0) {
          setDeleteWarning({ show: true, groups });
        } else {
          remove(body);
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

  const handleSelectModalOk = () => {
    setShowAlarmSelectTable(false);
    const dev = R.assoc("alarms", selectedAlarms, editingDevice);
    update(dev);
    setSelectdAlarms([]);
  };

  const handleSelectModalCancel = () => {
    setShowAlarmSelectTable(false);
    setSelectdAlarms([]);
  };

  const onAlarmSelectChanged = (dev, alarms) => {
    setSelectdAlarms(alarms);
  };

  const deviceType = {
    NormalNetwork: t("device.NormalNetwork"),
    Monitor: t("device.Monitor"),
    SimpleDevice: t("device.SimpleDevice"),
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: t("ip"),
      dataIndex: "ip",
      key: "ip",
      sorter: (a, b) => a.ip.localeCompare(b.ip),
    },
    {
      title: t("device.contact"),
      dataIndex: "userkey",
      key: "userkey",
      render: (userkey) => getName(userkey)(usersNameList),
      sorter: (a, b) => a.userkey.localeCompare(b.userkey),
    },
    {
      title: t("device.vendor"),
      dataIndex: "vendorkey",
      key: "vendorkey",
      sorter: (a, b) => a.vendorkey.localeCompare(b.vendorkey),
      render: (vkey) => {
        const vendor = R.find(R.propEq("key", vkey))(vendorList) || {};

        const content = (
          <div>
            <p>TEL:{vendor.phone}</p>
            <p>Email:{vendor.email}</p>
          </div>
        );
        return (
          <Popover title={vendor.name} content={content}>
            {vendor.name}
          </Popover>
        );
      },
    },
    {
      title: t("device.enableVoice"),
      dataIndex: "enableVoice",
      key: "enableVoice",
      render: (text, record, index) => {
        //<p>{JSON.stringify(record, null, 2)}</p>,
        const voiceEnable = R.propOr(false, "enableVoice", record);
        return (
          <Switch
            checked={voiceEnable}
            onChange={(checked) => {
              const device = R.assoc("enableVoice", checked, record);
              console.log("update ", device);
              update(device);
            }}
          />
        );
      },
    },
    {
      title: t("alarm.name"),
      dataIndex: "alarms",
      key: "alarms",
      render: (text, record, index) => {
        const alarms = record.alarms || [];
        return (
          <div className="navbar">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setEditingDevice(record);
                setShowAlarmSelectTable(true);
              }}
            >
              {alarms.length}
            </Button>
          </div>
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
      render: (text, record) => (
        <EditOperationCell handlerSetEditing={onEditing} record={record} />
      ),
    },
  ];

  return (
    <div>
      <Modal
        title={t("device.selectAlarm")}
        visible={showAlarmSelectTable}
        confirmLoading={confirmLoading}
        onOk={handleSelectModalOk}
        onCancel={handleSelectModalCancel}
        footer={[
          <Button key="ok" onClick={handleSelectModalOk}>
            {t("ok")}
          </Button>,
        ]}
      >
        <AlarmSelectTable
          onChanged={onAlarmSelectChanged}
          device={editingDevice}
        />
      </Modal>
      <TableToolbar
        title={t("device.tableTitle")}
        info={licenseInfo}
        selectedRowKeys={selectedRowKeys}
        onSearch={query}
        handlers={{
          addItem: addDefaultDevice,
          removeSelectedItems: checkRemove,
          // onSearch: searchUser
        }}
        componentsText={{
          add: t("device.add"),
          remove: t("device.removeSelected"),
        }}
      />
      <Drawer
        title={t("device.tableTitle")}
        visible={isShowUserForm}
        placement="right"
        footer={null}
        width="40%"
        onClose={() => setShowUserForm(false)}
      >
        <DeviceForm
          device={editingDevice}
          doSubmit={onSubmit}
          users={usersNameList}
          vendors={vendorList}
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
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default devicesTable;
