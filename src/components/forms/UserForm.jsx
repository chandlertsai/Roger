// @flow
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Button, Switch, Card, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Checkbox } from "components/forms/FormikWedgets";
import { setError } from "actions/appState";
import ErrorTip from "components/forms/ErrorTip";
import * as yup from "yup";
import axios from "axios";
import R from "ramda";
import FormRow from "components/forms/FormRow";
// $FlowFixMe
import "./form.less";

type Props = {
  userData: mixed,
  permissions: Array<mixed>,
  doSubmit: Function,
};

const validator = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
});

const userForm = (props: Props) => {
  const { doSubmit, userData, permissions } = props;
  const { t } = useTranslation();
  const createOptions = R.map((p) => (
    <Select.Option value={p.key} key={p.key}>
      {p.name}
    </Select.Option>
  ));

  function validateName(value) {
    let error;
    if (!value) {
      error = t("error.requireName");
    }
    return error;
  }

  return (
    <div>
      <Formik
        initialValues={userData}
        enableReinitialize
        validationSchema={validator}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          const newData = R.omit(["_id"], values);
          doSubmit(newData);
        }}
        render={({ errors, isValid, setFieldValue, values }) => (
          <Form className="container_col">
            <FormRow
              field="name"
              labelText={t("name")}
              fieldProp={{ type: "text" }}
            />
            {errors.name && <p className="error">{t("error.requireName")}</p>}
            <FormRow
              field="email"
              labelText="E-Mail"
              fieldProp={{ type: "email" }}
            />
            {errors.email && <p className="error">{t("error.emailFormat")}</p>}

            <FormRow
              field="passwordTip"
              labelText={t("passwordTip")}
              fieldProp={{ type: "text" }}
            />

            <div className="form-row">
              <label htmlFor="pkey">{t("permission")}</label>
              <Select
                value={values["pkey"]}
                name="pkey"
                onChange={(v) => setFieldValue("pkey", v)}
              >
                {createOptions(permissions)}
              </Select>
            </div>

            <Button className="center" htmlType="submit">
              {t("submit")}
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default userForm;
