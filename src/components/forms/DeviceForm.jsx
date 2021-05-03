// @flow
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";
import axios from "axios";
import * as yup from "yup";

// $FlowFixMe
import "./form.less";

function checkIPDuplicate(record) {
  return axios.get("/apis/v1/read/devices", {
    params: { ip: R.propOr("", "ip", record) },
  });
}

const validator = yup.object().shape({
  name: yup.string().required(),
  ip: yup
    .string()
    .required()
    .matches(
      /(^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$)/,
      {
        message: "Invalid IP address",
        excludeEmptyString: true,
      }
    ),
});

const deviceForm = (props) => {
  const { users, vendors, device, doSubmit } = props;
  const { name, ip, userkey, vendorkey, key } = device;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors, reset } = useForm({
    validationSchema: validator,
    defaultValues: device,
  });

  useEffect(() => {
    reset(device);
  }, [device]);

  const onSubmit = (data) => {
    const newData = R.pipe(R.mergeRight(device), R.omit(["_id"]))(data);
    doSubmit(newData);
    // checkIPDuplicate(newData)
    //   .then((res) => {
    //     const groups = res.data || [];
    //     if (groups.length > 0) {
    //       message.error(t("error.ipFormat"));
    //     } else {
    //       doSubmit(newData);
    //     }
    //   })
    //   .catch((err) => message.error(err));
    // if (checkIPDuplicate(newData)) {
    //   doSubmit(newData);
    // } else {
    //   message.error(t("error.ipFormat"));
    // }
  };

  const createOptions = R.map((p) => (
    <option value={p.key} key={p.key}>
      {p.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">{t("name")}</label>
        <input
          className="form-control"
          type="text"
          name="name"
          ref={register}
        />
      </div>
      {errors.name && <p className="error">{t("device.nameCantBlank")}</p>}

      {/* <div className="form-group">
        <label htmlFor="type">{t("device.type")} </label>
        <select name="type" className="custom-select" ref={register}>
          <option value="NormalNetwork">{t("device.NormalNetwork")}</option>
          <option value="Monitor">{t("device.Monitor")}</option>
          <option value="SimpleDevice">{t("device.SimpleDevice")}</option>
        </select>
      </div> */}

      <div className="form-group">
        <label htmlFor="ip">{t("ip")} </label>
        <input className="form-control" type="text" name="ip" ref={register} />
      </div>
      <small className="form-text text-muted">ex: 192.168.0.1</small>
      {errors.ip && <p className="error"> {t("error.ipFormat")}</p>}

      <div className="form-group">
        <label htmlFor="userkey">{t("device.contact")}</label>
        <select name="userkey" className="custom-select" ref={register}>
          {createOptions(users)}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="vendorkey">{t("device.vendor")}</label>
        <select name="vendorkey" className="custom-select" ref={register}>
          {createOptions(vendors)}
        </select>
      </div>

      <Button htmlType="submit"> {t("submit")} </Button>
    </form>
  );
};

export default deviceForm;
