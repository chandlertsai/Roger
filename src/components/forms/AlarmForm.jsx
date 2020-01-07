// @flow
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import useForm from "react-hook-form";
import { useList } from "react-use";
import R from "ramda";

import { default as ErrorDiv } from "./ErrorTip";
import AlarmConditionForm from "components/forms/AlarmConditionForm";
import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const alarmForm = props => {
  const { alarm, doSubmit } = props;
  const conditions = alarm.conditions || [];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    reset
  } = useForm({
    defaultValues: alarm
  });

  useEffect(() => {
    reset(alarm);
  }, [alarm]);

  useEffect(() => {
    register({ name: "conditions" });
  }, [register]);

  const speak = () => {
    const values = getValues();
    var words = new SpeechSynthesisUtterance(values["message"]);
    window.speechSynthesis.speak(words);
  };

  const onSubmit = data => {
    console.log("submit ", data);
    const newData = R.pipe(R.mergeRight(alarm), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

  const handleChanged = v => setValue("conditions", v);

  const createOptions = R.map(p => <option value={p.key}>{p.name}</option>);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="pollingInterval">名稱: </label>
        <input
          className="form-control"
          type="text"
          name="name"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label for="source">來源：</label>
        <select className="form-control" ref={register} name="source">
          <option value="cacti">Cacti</option>
          <option value="simpleLog">Simple Log</option>
          <option value="customSource">客製化來源</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pollingInterval">輪詢間隔時間 (秒): </label>
        <input
          className="form-control"
          type="number"
          min={1}
          max={1200}
          name="pollingInterval"
          ref={register}
        />
      </div>

      <div className="form-group">
        <label htmlFor="triggerType">觸發類型: </label>
        <select name="triggerType" className="custom-select" ref={register}>
          <option value="once">僅一次</option>
          <option value="always">每次輪詢</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">警告訊息: </label>
        <div className="d-flex">
          <input
            className="form-control"
            type="text"
            name="message"
            ref={register}
          />
          <Button type="primary" className="mx-2" onClick={speak}>
            語音
          </Button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="userkey">觸發條件: </label>

        <AlarmConditionForm conditions={conditions} onChanged={handleChanged} />
      </div>

      <Button htmlType="submit"> 確定 </Button>
    </form>
  );
};

export default alarmForm;
