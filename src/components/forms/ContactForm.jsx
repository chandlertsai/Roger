import React, { useState, useEffect } from "react";
import { Button } from "antd";
import useForm from "react-hook-form";
import ContactTable from "components/tables/ContactTable";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";
import ContactItemForm from "components/forms/ContactItemForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import { useList } from "react-use";
import { uniqueKey } from "apis/utils";

const itemIndex = key => R.findIndex(R.propEq("key", key));

const contactForm = props => {
  const [editingItem, setEditingItem] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState();
  const { vendor, doSubmit } = props;

  useEffect(() => {
    setData(vendor);
  }, [vendor]);

  const onEditing = data => {
    setEditingItem(data);
    setShowForm(true);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: selectKeys => setSelectedRowKeys(selectKeys)
  };
  const addDefaultContact = () => {
    const key = uniqueKey("contact");
    const newContact = {
      key: key,
      name: "請輸入名稱",
      title: "請輸入職稱",
      sex: "male"
    };
    onEditing(newContact);
  };
  const removeContact = () => {};
  const onFinish = () => {
    console.log("onFinish ", data);

    doSubmit(data);
  };
  const onSubmit = newItem => {
    const idx = itemIndex(newItem.key)(data.contacts);
    console.log("contactForm modify idx ", idx);
    if (idx < 0) {
      const newContacts = R.pipe(R.prop("contacts"), R.append(newItem));
      const addContact = R.useWith(R.assoc("contacts"), [
        newContacts,
        R.identity
      ]);

      R.pipe(addContact, setData)(data);
    } else {
      //update
      const updateContact = R.pipe(R.prop("contacts"), R.update(idx, newItem));

      const setContact = R.useWith(R.assoc("contacts"), [
        updateContact,
        R.identity
      ]);
      R.pipe(setContact, setData)(data);
    }
    setShowForm(false);
  };

  return (
    <div className="container">
      <TableToolbar
        title="聯絡人"
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultContact,
          removeSelectedItems: removeContact
          // onSearch: searchUser
        }}
        componentsText={{
          add: "新增聯絡人",
          remove: "移除選取聯絡人"
        }}
      />
      <ContactTable
        {...data}
        onEditing={onEditing}
        rowSelection={rowSelection}
      />
      {showForm ? (
        <ContactItemForm
          doSubmit={onSubmit}
          contact={editingItem}
          hideForm={() => setShowForm(false)}
        />
      ) : (
        <Button type="primary" onClick={onFinish}>
          確定
        </Button>
      )}
    </div>
  );
};

export default contactForm;
