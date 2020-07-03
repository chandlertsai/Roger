// @flow
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";

import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string(),
  mobile: yup.string(),
  fax: yup.string(),
  email: yup.string().email(),
  title: yup.string(),
});

type tProps = {
  contact: mixed,
  doSubmit: Function,
};

const contactItemForm = (props: tProps) => {
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: validator,
  });
  const { t } = useTranslation();
  const { contact, doSubmit, hideForm } = props;

  useEffect(() => {
    reset(contact);
  }, [contact]);
  const onSubmit = (data) => {
    console.log("contact item form submit ", data);
    const newData = R.pipe(R.mergeRight(contact), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

  const createOptions = R.map((p) => (
    <option value={p.key} key={p.key}>
      {p.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col-auto">
          <label htmlFor="name">{t("name")}</label>
          <input
            className="form-control"
            type="text"
            name="name"
            ref={register}
          />
          {errors.name && <p className="error">{t("error.requireName")}</p>}
        </div>

        <div className="col-auto">
          <label htmlFor="title">{t("contact.title")} </label>
          <input
            className="form-control"
            type="text"
            name="title"
            ref={register}
          />
          {errors.title && <p className="error">職稱必須是字串</p>}
        </div>

        <div className="col-auto">
          <label htmlFor="sex"> {t("sex")}</label>
          <select name="sex" className="custom-select" ref={register}>
            <option value="male">{t("male")}</option>
            <option value="woman">{t("female")}</option>
            <option value="undefined">不明</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="form-control" type="text" ref={register} />
      </div>
      {errors.email && <p className="error">{t("error.emailFormat")}</p>}
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
        <label htmlFor="phone">{t("mobile")} </label>
        <input
          className="form-control"
          type="text"
          name="mobile"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">{t("fax")} </label>
        <input className="form-control" type="text" name="fax" ref={register} />
      </div>
      <Button htmlType="submit" type="primary">
        {t("submit")}
      </Button>
      <Button type="secondary" className="mx-1" onClick={hideForm}>
        {t("cancel")}
      </Button>
    </form>
  );
};

export default contactItemForm;
