// @flow
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tag } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { auth } from "reducers/storeUtils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { propOr } from "ramda";

const alarmControlPanel = (props) => {
  const { t } = useTranslation();
  const { alarm, onClose } = props;
  const authObj = useSelector(auth);
  const [ipExist, setIPExist] = useState(false);
  useEffect(() => {
    axios
      .get("webapi/api/device/checkIP", { params: { ip: alarm.ip } })
      .then((v) => {
        const { data = { exist: true } } = v;
        const exist = data.exist || true;
        setIPExist(exist);
      })
      .catch((err) => {
        setIPExist(true);
      });
  }, []);

  const getColor = (state) => {
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
  const createTag = (state) => {
    let stateText = "";
    switch (state) {
      case "alarm":
        stateText = t("alarmState.alarm");
        break;
      case "ack":
        stateText = t("alarmState.ack");
        break;
      case "close":
        stateText = t("alarmState.close");
        break;
    }
    return <Tag color={getColor(state)}>{stateText}</Tag>;
  };
  const ack = () => {
    var url = "/webapi/api/ackAlarm";
    let body = {
      alarmKey: alarm.key,
      userKey: authObj.key,
    };
    axios.post(url, body).then((res) => console.log(res.data));

    onClose();
  };

  const close = () => {
    var url = "/webapi/api/closeAlarm";

    axios
      .get(url, { params: { alarmKey: alarm.key } })
      .then((res) => console.log(res.data));

    onClose();
  };

  return (
    <div className="pl-2">
      <h3>{alarm.name}</h3>

      <p>
        {ipExist ? (
          <CheckCircleOutlined twoToneColor="#52c41a" />
        ) : (
          <CloseCircleOutlined twoToneColor="#eb2f96" />
        )}
        {alarm.ip}
      </p>
      <p>
        {t("alarm.message")} : {alarm.message}
      </p>
      <span>{t("alarmState.state")} </span>
      {createTag(alarm.state)}

      <span className="mx-1">{t("setting")} :</span>

      {alarm.state == "alarm" && alarm.source != "simpleLog" ? (
        <div className="btn btn-info mx-1" onClick={() => ack()}>
          {t("alarmState.ack")}
        </div>
      ) : null}
      {alarm.state != "close" && alarm.source != "simpleLog" ? (
        <div className="btn btn-danger mx-1" onClick={() => close()}>
          {t("alarmState.close")}
        </div>
      ) : null}
    </div>
  );
};

alarmControlPanel.defaultProps = {
  alarm: {
    name: "",
    ip: "",
    message: "",
    time: "",
    state: "close",
  },
};

export default alarmControlPanel;
