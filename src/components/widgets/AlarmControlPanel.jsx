// @flow
import React, { useState } from "react";
import axios from "axios";
import { Tag } from "antd";
import classNames from "classnames";

const alarmControlPanel = props => {
  const { alarm, onClose } = props;

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
  const setState = state => {
    var url = "/webapi/api/";
    switch (state) {
      case "ack":
        url += "ackAlarm";
        break;
      case "read":
        url += "readAlarm";
        break;
      case "close":
        url += "closeAlarm";
        break;
    }
    axios
      .get(url, { params: { alarmKey: alarm.alarmKey } })
      .then(res => console.log(res.data));
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

      <div className="btn btn-info mx-1" onClick={() => setState("ack")}>
        Ack
      </div>

      <div className="btn btn-secondary mx-1" onClick={() => setState("read")}>
        Read
      </div>

      <div className="btn btn-success mx-1" onClick={() => setState("close")}>
        Close
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
