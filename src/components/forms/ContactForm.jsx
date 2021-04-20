import React, { useState, useEffect } from "react";
import { Button, Divider } from "antd";
import { useForm } from "react-hook-form";
import ContactTable from "components/tables/ContactTable";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";
import ContactItemForm from "components/forms/ContactItemForm";
import TableToolbar from "components/pureComponents/TableToolbar";
import { useList } from "react-use";
import { uniqueKey } from "apis/utils";
import { useTranslation } from "react-i18next";
const itemIndex = (key) => R.findIndex(R.propEq("key", key));

const contactForm = (props) => {
  const [editingItem, setEditingItem] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState();
  const { vendor, doSubmit, onClose ,showButton} = props;
  const { t } = useTranslation();
  useEffect(() => {
    setData(vendor);
  }, [vendor]);

  const onEditing = (data) => {
    setEditingItem(data);
    setShowForm(true);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectKeys) => setSelectedRowKeys(selectKeys),
  };
  const addDefaultContact = () => {
    const key = uniqueKey("contact");
    const newContact = {
      key: key,
      sex: "male",
    };
    onEditing(newContact);
  };

  const removeContact = (selectedKey) => {
    if(selectedKey.length!==0){
    const x = R.reject(R.where({key: R.flip(R.includes)(selectedKey)}));
    const dataAfterRemovingSelect = x(data.contacts);
    const newData = R.assoc("contacts",dataAfterRemovingSelect)(data);
    setData(newData);
    }else{

     };
  };

  const onFinish = () => {
    console.log("onFinish ", data);
    onClose();
    doSubmit(data);
  };
  const onSubmit = (newItem) => {
    const idx = itemIndex(newItem.key)(data.contacts);
    console.log("contactForm modify idx ", idx);
    if (idx < 0) {
      const newContacts = R.pipe(R.prop("contacts"), R.append(newItem));
      const addContact = R.useWith(R.assoc("contacts"), [
        newContacts,
        R.identity,
      ]);

      R.pipe(addContact, setData)(data);
    } else {
      //update
      const updateContact = R.pipe(R.prop("contacts"), R.update(idx, newItem));

      const setContact = R.useWith(R.assoc("contacts"), [
        updateContact,
        R.identity,
      ]);
      R.pipe(setContact, setData)(data);
    }
    setShowForm(false);
  };

  return (
    <div className="container">
      {showButton ? (
        <Divider>
          <Button onClick={onClose}>Close</Button>
        </Divider>
      ) : null}
      <TableToolbar
        title={t("contact.name")}
        selectedRowKeys={selectedRowKeys}
        handlers={{
          addItem: addDefaultContact,
          removeSelectedItems: removeContact,
          // onSearch: searchUser
        }}
        componentsText={{
          add: t("contact.add"),
          remove: t("contact.remove"),
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
          {t("submit")}
        </Button>
      )}
    </div>
  );
};

export default contactForm;
