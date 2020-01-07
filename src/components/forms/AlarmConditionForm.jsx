// @flow
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { useList } from "react-use";
import R from "ramda";
import useForm from "react-hook-form";

import { uniqueKey } from "apis/utils";

const conditionList = [
  { key: ">", text: ">" },
  { key: "<", text: "<" },
  { key: "=", text: "=" },
  { key: ">=", text: ">=" },
  { key: "<=", text: "<=" },
  { key: "has", text: "包含" }
];

export default props => {
  const { conditions, onChanged } = props;
  const [cond, conditionsAciton] = useList(conditions);
  const mapIndex = R.addIndex(R.map);

  const addConditions = () => {
    if (cond.length >= 5) {
      message.warning("觸發條件最多5個");
      return;
    }
    conditionsAciton.push({
      key: uniqueKey("condition"),

      input: "",
      condition: ">",
      operator: "",
      not: false
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
      <label htmlFor="cond">執行條件: </label>
      <select
        name="condition"
        className="custom-select"
        value={cond.condition}
        onChange={e => handleChanged(idx, e)}
      >
        {R.map(
          v => (
            <option value={v.key}> {v.text} </option>
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
        class="close"
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
            <label htmlFor="input">輸入欄位:</label>
            <input
              className="form-control"
              type="text"
              value={cond.input}
              name="input"
              onChange={e => handleChanged(idx, e)}
            />
          </div>
        </div>
        <div className="col">{createConditionSelects(cond, idx)}</div>
        <div className="col">
          <label htmlFor="operator"> 比較對象:</label>
          <input
            className="form-control"
            type="text"
            value={cond.operator}
            name="operator"
            onChange={e => handleChanged(idx, e)}
          />
        </div>
      </div>
      <small id="inputHelp" className="form-text text-muted">
        輸入欄位是JSON欄位名稱，如希望處理cacti欄位action就輸入action(請注意大小寫)
      </small>
    </div>
  ));

  return (
    <div className="form=group">
      <Button onClick={addConditions}>Add</Button>{" "}
      <span className="float-right">{cond.length}/5</span>
      {createConditions(cond)}
    </div>
  );
};
