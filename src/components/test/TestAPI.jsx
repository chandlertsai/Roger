// @flow
import React from "react";
import { connect } from "react-redux";
import { Descriptions } from "antd";

import RequestComponent from "components/test/RequestComponent";

const testAPI = props => {
  return (
    <div>
      <h2>API Testing</h2>
      <Descriptions title='Information'>
        <Descriptions.Item label='host'>
          http://localhost:3001
        </Descriptions.Item>
        <Descriptions.Item label='token'>
          {props.state.auth.token}
        </Descriptions.Item>
      </Descriptions>
      <RequestComponent />
    </div>
  );
};

export default connect(state => ({ state }))(testAPI);
