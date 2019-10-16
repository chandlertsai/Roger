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
  selectedRowKeys: Array<string>
};

const tableToolBar = (props: Props) => {
  const { handlers, componentsText, selectedRowKeys } = props;
  const { addItem, removeSelectedItems } = handlers;

  return (
    <div>
      <Row>
        <Col span={16}>
          <Button
            type='default'
            icon='plus'
            onClick={addItem}
            style={{ margin: "5px" }}
          >
            {componentsText.add}
          </Button>

          <Button
            type='danger'
            icon='delete'
            onClick={() => removeSelectedItems(selectedRowKeys)}
            style={{ margin: "5px" }}
          >
            {componentsText.remove}
          </Button>
        </Col>
      </Row>
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
