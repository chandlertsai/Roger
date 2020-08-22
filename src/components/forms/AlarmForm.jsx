// @flow
import React, { useState, useEffect } from "react";
import { Button, Group, Radio } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useList } from "react-use";
import R from "ramda";
import { useTranslation } from "react-i18next";
import { default as ErrorDiv } from "./ErrorTip";
import AlarmConditionForm from "components/forms/AlarmConditionForm";
import AlarmActionForm from "components/forms/AlarmActionForm";
import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const alarmForm = (props) => {
  const { alarm, doSubmit } = props;
  const conditions = alarm.conditions || [];
  const releaseConditions = alarm.releaseConditions || [];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    reset,
    control,
  } = useForm({
    defaultValues: alarm,
  });

  const { t } = useTranslation();

  useEffect(() => {
    reset(alarm);
  }, [alarm]);

  useEffect(() => {
    register();
    register({ name: "conditions" });
    register({ name: "releaseConditions" });
  }, [register]);

  const speak = () => {
    const values = getValues();
    var words = new SpeechSynthesisUtterance(values["message"]);
    window.speechSynthesis.speak(words);
  };

  const onSubmit = (data) => {
    console.log("submit ", data);
    const newData = R.pipe(R.mergeRight(alarm), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

  const handleTriggerCondtionChanged = (v) => setValue("conditions", v);
  const handleReleaseCondtionChanged = (v) => setValue("releaseConditions", v);

  const createOptions = R.map((p) => <option value={p.key}>{p.name}</option>);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="pollingInterval">{t("name")}</label>
        <input
          className="form-control"
          type="text"
          name="name"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="source">{t("alarm.source")}</label>
        <select className="form-control" ref={register} name="source">
          <option value="cacti">Cacti</option>
          <option value="simpleLog">Simple Log</option>
          <option value="customSource">{t("alarm.customSource")}</option>
        </select>
        <small id="inputHelp" className="form-text text-muted">
          {t("alarm.simpleLogTip")}
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="pollingInterval">{t("alarm.pollingInterval")}</label>
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
        <label htmlFor="message">{t("alarm.message")} </label>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="enableVoice"
            ref={register}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            {t("alarm.voiceEnable")}
          </label>
        </div>
        <div className="d-flex">
          <input
            className="form-control"
            type="text"
            name="message"
            ref={register}
          />
          <Button type="primary" className="mx-2" onClick={speak}>
            {t("test")}
          </Button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="userkey">{t("alarm.triggerCondition")} </label>

        <Controller
          className="ml-2"
          as={
            <Radio.Group>
              <Radio value="all">All</Radio>
              <Radio value="any">Any</Radio>
            </Radio.Group>
          }
          name="triggerLogic"
          onChange={([v]) => v.target.value}
          value={alarm.triggerLogic}
          control={control}
        />

        <AlarmConditionForm
          conditions={conditions}
          onChanged={handleTriggerCondtionChanged}
        />
      </div>

      <div className="form-group">
        <label htmlFor="userkey">{t("alarm.releaseCondition")} </label>
        <Controller
          className="ml-2"
          as={
            <Radio.Group>
              <Radio value="all">All</Radio>
              <Radio value="any">Any</Radio>
            </Radio.Group>
          }
          name="releaseLogic"
          onChange={([v]) => v.target.value}
          value={alarm.releaseLogic}
          control={control}
        />
        <AlarmConditionForm
          conditions={releaseConditions}
          onChanged={handleReleaseCondtionChanged}
        />
      </div>

      <Button htmlType="submit"> {t("submit")} </Button>
    </form>
  );
};

export default alarmForm;
