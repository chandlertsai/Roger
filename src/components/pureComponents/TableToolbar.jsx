// @flow
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDebounce } from "apis/utils";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Dropdown, Menu, Row, Col } from "antd";

type Handlers = {
  addItem: Function,
  removeSelectedItems: Function,
};
type ComponentText = {
  scan?: string,
  add?: string,
  remove?: string,
};
type Props = {
  handlers: Handlers,
  componentsText: ComponentText,
  selectedRowKeys: Array<string>,
  title: string,
  info?: string,
  onSearch?: Function,
  placeholder: string,
};

const tableToolBar = (props: Props) => {
  const {
    handlers,
    componentsText,
    selectedRowKeys,
    title,
    info,
    onSearch,
    placeholder,
  } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem, removeSelectedItems } = handlers;
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (onSearch) {
      onSearch(debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  return (
    <div className="navbar navbar-light bg-light">
      <div className="navbar-brand">{title}</div>
      <span className="navbar-text">{info}</span>
      <div className="form-inline">
        {onSearch ? (
          <Input
            className="form-control mr-2"
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={(e) => setSearchTerm(e.target.value)}
	    placeholder={placeholder}
          />
        ) : null}

        <Button type="default" icon={<PlusOutlined />} onClick={addItem}>
          {componentsText.add}
        </Button>

        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => removeSelectedItems(selectedRowKeys)}
          className="ml-1"
        >
          {componentsText.remove}
        </Button>
      </div>
    </div>
  );
};

tableToolBar.propTypes = {
  handlers: PropTypes.object,
  componentsText: PropTypes.object,
  tableInformation: PropTypes.object,
};

tableToolBar.defaultProps = {
  handlers: {},
  componentsText: {
    add: "",
    remove: "",
    scan: "",
  },
  tableInformation: {},
};
export default tableToolBar;
