// @flow

import React, { useState, useEffect } from "react";
import { useFetch } from "apis/crud";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Drawer, Tag, Button } from "antd";
import VendorForm from "components/forms/VendorForm";
import ContactForm from "components/forms/ContactForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import ContactTable from "components/tables/ContactTable";
import R from "ramda";

const vendorTable = props => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableData, remove, update] = useFetch("vendors");
  const [isShowVendorForm, setShowVendorForm] = useState(false);
  const [isShowContactForm, setShowContactForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState({});

  const onEditing = record => {
    setEditingVendor(record);
    setShowVendorForm(true);
  };

  const onEditingContact = record => {
    setShowContactForm(true);
  };

  const onSubmit = vendor => {
    const newData = R.omit(["_id"], vendor);
    update(newData);
    setShowVendorForm(false);
    setShowContactForm(false);
    console.log("vendortable onsubmit update ", newData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: selectKeys => setSelectedRowKeys(selectKeys)
  };

  const addDefaultVendor = () => {
    const key = uniqueKey("vendor");
    onEditing({
      key: key,
      name: "",
      phone: "",
      email: "",
      contacts: []
    });
  };

  const columns = [
    {
      title: "名稱",
      dataIndex: "name",
      key: "name"
    },

    {
      title: "電話",
      dataIndex: "phone",
      key: "phone"
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email"
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
        title="供應商"
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultVendor,
          removeSelectedItems: remove
          // onSearch: searchUser
        }}
        componentsText={{
          add: "新增",
          remove: "移除選取項目"
        }}
      />
      <Drawer
        title="編輯供應商資料"
        visible={isShowVendorForm}
        placement="bottom"
        footer={null}
        height="80%"
        onClose={() => setShowVendorForm(false)}
      >
        <Button type="primary" className="my-2" onClick={onEditingContact}>
          編輯聯絡人
        </Button>
        <VendorForm doSubmit={onSubmit} vendor={editingVendor} />
      </Drawer>
      <Drawer
        title="編輯聯絡人資料"
        visible={isShowContactForm}
        placement="bottom"
        footer={null}
        destroyOnClose={true}
        height="75%"
        onClose={() => setShowContactForm(false)}
      >
        <ContactForm doSubmit={onSubmit} vendor={editingVendor} />
      </Drawer>
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        expandedRowRender={ContactTable}
        dataSource={tableData}
      />
    </div>
  );
};

export default vendorTable;
