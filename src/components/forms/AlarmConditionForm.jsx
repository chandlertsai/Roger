// @flow
import React, { useState, useEffect } from "react";
import { Button, message, Menu, Dropdown, Space } from "antd";
import { useList } from "react-use";
import R from "ramda";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { uniqueKey } from "apis/utils";

export default (props) => {
  const { conditions, onChanged } = props;
  const [cond, conditionsAciton] = useList(conditions);
  const { t } = useTranslation();
  const conditionList = [
    { key: ">", text: ">" },
    { key: "<", text: "<" },
    { key: "=", text: "=" },
    { key: ">=", text: ">=" },
    { key: "<=", text: "<=" },
    { key: "equal", text: "equal" },
    { key: "has", text: t("alarm.conditionHas") },
    { key: "hasnot", text: t("alarm.conditionHasnot") },
    { key: "exist", text: t("alarm.conditionExist") },
  ];

  // "conditionInsertCameraSimplelog": "增加camera條件",
  //   "conditionInsertTemperatureSimplelog": "增加溫濕度條件",
  //   "conditionInsertRawTextSimplelog": "增加純字串條件",

  const addDefaultSimplelog = (key) => {
    if (cond.length >= 5) {
      message.warning(t("alarm.conditionLimitWarnning"));
      return;
    }

    switch (key) {
      case "camera":
        conditionsAciton.push({
          key: uniqueKey("condition"),

          input: "EVENT_TYPE",
          condition: "exist",
          operator: "",
          not: false,
        });
        break;
      case "temperature":
        conditionsAciton.push({
          key: uniqueKey("condition"),

          input: "temperature",
          condition: ">=",
          operator: "",
          not: false,
        });
        conditionsAciton.push({
          key: uniqueKey("condition"),

          input: "humidityFiled",
          condition: ">=",
          operator: "",
          not: false,
        });
        break;
    }
  };

  const DefaultSimplelogMenu = (
    <Menu onClick={({ key }) => addDefaultSimplelog(key)}>
      <Menu.Item key="camera">
        {t("alarm.conditionInsertCameraSimplelog")}
      </Menu.Item>
      <Menu.Item key="temperature">
        {t("alarm.conditionInsertTemperatureSimplelog")}
      </Menu.Item>
    </Menu>
  );

  const mapIndex = R.addIndex(R.map);

  const addConditions = () => {
    if (cond.length >= 5) {
      message.warning(t("alarm.conditionLimitWarnning"));
      return;
    }
    conditionsAciton.push({
      key: uniqueKey("condition"),

      input: "",
      condition: ">",
      operator: "",
      not: false,
    });
  };

  useEffect(() => {
    onChanged(cond);
  }, [cond]);

  const handleChanged = (idx, e) => {
    const v = R.assoc(e.target.name, e.target.value, {});
    const newValue = R.mergeLeft(v, cond[idx]);
    conditionsAciton.updateAt(idx, newValue);
  };

  const createConditionSelects = (cond, idx) => (
    <div key={cond.key}>
      <label htmlFor="cond">{t("condition")}</label>
      <select
        name="condition"
        className="custom-select"
        value={cond.condition}
        onChange={(e) => handleChanged(idx, e)}
      >
        {R.map(
          (v) => (
            <option key={v.key} value={v.key}>
              {v.text}
            </option>
          ),
          conditionList
        )}
      </select>
    </div>
  );

  const createConditions = mapIndex((cond, idx) => (
    <div key={cond.key} className="my-2 p-3 border ">
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => conditionsAciton.remove(idx)}
      >
        <span aria-hidden="true" className="text-danger">
          &times;
        </span>
      </button>

      <div className="row">
        <div className="col">
          <div>
            <label htmlFor="input">{t("inputField")}</label>
            <input
              className="form-control"
              type="text"
              value={cond.input}
              name="input"
              onChange={(e) => handleChanged(idx, e)}
            />
          </div>
        </div>
        <div className="col">{createConditionSelects(cond, idx)}</div>
        <div className="col">
          <label htmlFor="operator"> {t("compareTo")} </label>
          <input
            className="form-control"
            type="text"
            value={cond.operator}
            name="operator"
            onChange={(e) => handleChanged(idx, e)}
          />
        </div>
      </div>
      <small id="inputHelp" className="form-text text-muted">
        {t("alarm.conditionInputWarnning")}
      </small>
    </div>
  ));

  return (
    <div className="form-group">
      <div className="row">
        <div className="col">
          <Button onClick={addConditions}>Add</Button>
        </div>
        <div className="col">
          <Dropdown overlay={DefaultSimplelogMenu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {t("alarm.addDefaultSimplelog")}
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <span className="float-right">{cond.length}/5</span>
      {createConditions(cond)}
    </div>
  );
};
