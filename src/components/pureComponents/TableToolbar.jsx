// @flow
import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Dropdown, Menu, Icon, Row, Col } from "antd";

type Handlers = {
  addItem: Function,
  removeSelectedItems: Function
};
type ComponentText = {
  scan?: string,
  add?: string,
  remove?: string
};
type Props = {
  handlers: Handlers,
  componentsText: ComponentText,
  selectedRowKeys: Array<string>,
  title: string,
  info?: string
};

const tableToolBar = (props: Props) => {
  const { handlers, componentsText, selectedRowKeys, title, info } = props;
  const { addItem, removeSelectedItems } = handlers;

  return (
    <div className='navbar navbar-light bg-light'>
      <div className='navbar-brand'>{title}</div>
      <span className='navbar-text'>{info}</span>
      <form className='form-inline'>
        <Button type='default' icon='plus' onClick={addItem}>
          {componentsText.add}
        </Button>

        <Button
          type='danger'
          icon='delete'
          onClick={() => removeSelectedItems(selectedRowKeys)}
          className='ml-1'
        >
          {componentsText.remove}
        </Button>
      </form>
    </div>
  );
};

tableToolBar.propTypes = {
  handlers: PropTypes.object,
  componentsText: PropTypes.object,
  tableInformation: PropTypes.object
};

tableToolBar.defaultProps = {
  handlers: {},
  componentsText: {
    add: "",
    remove: "",
    scan: ""
  },
  tableInformation: {}
};
export default tableToolBar;
