// @flow
import React, { useState } from "react";
import axios from "axios";
import { Tag } from "antd";
import classNames from "classnames";
import { auth } from "reducers/storeUtils";
import { useSelector } from "react-redux";

const alarmControlPanel = props => {
  const { alarm, onClose } = props;
  const authObj = useSelector(auth);

  const getColor = state => {
    switch (state) {
      case "alarm":
        return "red";
      case "closed":
        return "gray";
      case "read":
        return "gold";
      case "ack":
        return "geekblue";
    }
  };
  const createTag = state => <Tag color={getColor(state)}>{state}</Tag>;
  const ack = () => {
    var url = "/webapi/api/ackAlarm";
    let body = {
      alarmKey: alarm.key,
      userKey: authObj.key
    };
    axios.post(url, body).then(res => console.log(res.data));

    onClose();
  };

  return (
    <div className="pl-2">
      <h3>{alarm.name}</h3>
      <p>{alarm.ip}</p>
      <p>訊息: {alarm.message}</p>
      <span>State: </span>
      {createTag(alarm.state)}

      <span className="mx-1">設定狀態: </span>

      <div className="btn btn-info mx-1" onClick={() => ack()}>
        Ack
      </div>
    </div>
  );
};

alarmControlPanel.defaultProps = {
  alarm: {
    name: "",
    ip: "",
    message: "",
    time: "",
    state: "close"
  }
};

export default alarmControlPanel;
