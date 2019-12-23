// @flow
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import R from "ramda";

import { Button, Row, Col } from "antd";

import { useFetchFields } from "apis/crud";
import {
  UsersSimpleTable,
  DevicesSimpleTable
} from "components/pages/SimpleTables";

// $FlowFixMe
import "./form.less";

type tProps = {
  group: mixed,
  doSubmit: Function
};

const groupForm = (props: tProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "" });
  const [usersSelectedRowKeys, setUsersSelectedRowKeys] = useState([]);
  const [devicesSelectedRowKeys, setDevicesSelectedRowKeys] = useState([]);
  const users = useFetchFields("users")(["name", "key", "email"]);
  const devices = useFetchFields("devices")(["name", "key", "ip"]);
  const { group, doSubmit } = props;

  // initial
  useEffect(() => {
    console.log("GroupForm props.group ", group);
    setFormData(group);
    setUsersSelectedRowKeys(group.userKeys);
    setDevicesSelectedRowKeys(group.deviceKeys);
  }, [group]);

  const usersRowSelection = {
    selectedRowKeys: usersSelectedRowKeys,
    onChange: selectKeys => setUsersSelectedRowKeys(selectKeys)
  };

  const devicesRowSelection = {
    selectedRowKeys: devicesSelectedRowKeys,
    onChange: selectKeys => setDevicesSelectedRowKeys(selectKeys)
  };

  const onSubmit = () => {
    const writeKeys = R.pipe(
      R.assoc("userKeys", usersSelectedRowKeys),
      R.assoc("deviceKeys", devicesSelectedRowKeys)
    );

    const newData = R.pipe(writeKeys, R.omit(["_id"]))(formData);

    doSubmit(newData);
  };

  const handleNameChange = e => {
    const newData = R.assoc("name", R.path(["target", "value"], e))(formData);
    setFormData(newData);
  };

  return (
    <div>
      <Row>
        <Col>
          <div className="form-group w-25">
            <label htmlFor="name">群組名稱: </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={15}>
        <Col span={12}>
          <UsersSimpleTable rowSelection={usersRowSelection} data={users} />
        </Col>
        <Col span={12}>
          <DevicesSimpleTable
            rowSelection={devicesRowSelection}
            data={devices}
          />
        </Col>
      </Row>

      <Button onClick={onSubmit}> 確定 </Button>
    </div>
  );
};

export default groupForm;
