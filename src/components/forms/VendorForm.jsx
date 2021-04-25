// @flow
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string(),
  email: yup.string().email(),
});

type tProps = {
  vendor: mixed,
  doSubmit: Function,
};

const vendorForm = (props: tProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: validator,
  });

  const { vendor, doSubmit } = props;
  const { t } = useTranslation();
  useEffect(() => {
    reset(vendor);
  }, [vendor]);

  const onSubmit = (data) => {
    const newData = R.pipe(R.mergeRight(vendor), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">{t("name")} </label>
        <input
          className="form-control"
          type="text"
          name="name"
          ref={register}
        />
      </div>
      {errors.name && <p className="error">{t("vendorform.require")}</p>}

      <div className="form-group">
        <label htmlFor="phone">{t("phone")} </label>
        <input
          className="form-control"
          type="text"
          name="phone"
          ref={register}
        />
      </div>

      <div className="form-group">
        <label htmlFor="fax">{t("fax")} </label>
        <input className="form-control" type="text" name="fax" ref={register} />
      </div>

      <div className="form-group">
        <label htmlFor="email">{t("email")} </label>
        <input
          className="form-control"
          type="email"
          name="email"
          ref={register}
        />
      </div>
      {errors.email && <p className="error">{t("vendorform.emailError")}</p>}

      <Button htmlType="submit"> {t("next")} </Button>
    </form>
  );
};

export default vendorForm;
