import React from "react";
import history from "routers/history";
import { Result, Button } from "antd";
const permissionDenied = ({ reason }) => {
  return (
    <div>
      <Result
        status='warning'
        title={reason}
        extra={
          <Button type='primary' onClick={() => history.goBack()}>
            回上一頁
          </Button>
        }
      />
    </div>
  );
};

export default permissionDenied;
