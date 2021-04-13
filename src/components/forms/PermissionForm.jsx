// @flow
import React, { useEffect, useState } from "react";
import { useFormik, Field, FormikProvider } from "formik";
import { Button, Switch, Card, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Checkbox } from "components/forms/FormikWedgets";
import { setError } from "actions/appState";
import ErrorTip from "components/forms/ErrorTip";
import axios from "axios";
import R from "ramda";
import FormRow from "components/forms/FormRow";

// $FlowFixMe
import "./form.less";
type Props = {
  permissions: any,
  doSubmit: Function,
};

const permissionForm = (props: Props) => {
  const { permissions, doSubmit } = props;

  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: permissions,
    enableReinitialize: true,
    onSubmit: (values, actions) => {
      actions.setSubmitting(false);
      const newData = R.omit(["_id"], values);
      doSubmit(newData);
    },
  });
  function validateName(value) {
    let error;
    if (!value) {
      error = t("error.requireName");
    }
    return error;
  }

  const createGroupCheckbox = () =>
    R.map(
      (item) => (
        <div key={item}>
          <Field type="checkbox" name="abilities" value={item} />
          <label style={{ marginLeft: "8px" }}>{t("menu." + item)}</label>
        </div>
      ),
      [
        "report",
        "userSetting",
        "deviceSetting",
        "alarmsSetting",
        "systemManagement",
      ]
    );

  return (
    <FormikProvider value={formik}>
      <form className="container_col" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">{t("name")}</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <div role="group" style={{ float: "left" }}>
          {createGroupCheckbox()}
        </div>
        <Button className="center" htmlType="submit">
          {t("submit")}
        </Button>
      </form>
    </FormikProvider>
  );
};

export default permissionForm;
