// @flow
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Button, Switch, Card, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Checkbox } from "components/forms/FormikWedgets";
import { setError } from "actions/appState";
import ErrorTip from "components/forms/ErrorTip";
import axios from "axios";
import R from "ramda";
import FormRow from "components/forms/FormRow";
import * as yup from "yup";
// $FlowFixMe
import "./form.less";
type Props = {
  permissions: any,
  doSubmit: Function,
};

const validator = yup.object().shape({
  name: yup.string().required(),
});

const permissionForm = (props: Props) => {
  const { permissions, doSubmit } = props;

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    reset,
    control,
  } = useForm({
    defaultValues: permissions,
    validationSchema: validator,
  });

  useEffect(() => {
    reset(permissions);
  }, [permissions]);

  // <Field type="checkbox" name="abilities" value={item} />
  // <label style={{ marginLeft: "8px" }}>{t("menu." + item)}</label>
  const createGroupCheckbox = () =>
    R.map(
      (item) => (
        <label key={item} style={{ marginRight: "8px" }}>
          <input
            style={{ marginRight: "4px" }}
            type="checkbox"
            value={item}
            name="abilities"
            ref={register}
          />
          {t("menu." + item)}
        </label>
      ),
      [
        "report",
        "userSetting",
        "deviceSetting",
        "alarmsSetting",
        "systemManagement",
      ]
    );

  const onSubmit = (data) => {
    console.log("submit ", data);
    const newData = R.pipe(R.mergeRight(permissions), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

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
      {errors.name && <p className="error">{t("error.requireName")}</p>}
      <div className="form-group">{createGroupCheckbox()}</div>
      <Button htmlType="submit"> {t("submit")} </Button>
    </form>
  );

  // return (
  //   <FormikProvider value={formik}>
  //     <form className="container_col" onSubmit={formik.handleSubmit}>
  //       <label htmlFor="name">{t("name")}</label>
  //       <input
  //         id="name"
  //         name="name"
  //         type="text"
  //         onChange={formik.handleChange}
  //         value={formik.values.name}
  //       />

  //       <div role="group" style={{ float: "left" }}>
  //         {createGroupCheckbox()}
  //       </div>
  //       <Button className="center" htmlType="submit">
  //         {t("submit")}
  //       </Button>
  //     </form>
  //   </FormikProvider>
  // );
};

export default permissionForm;
