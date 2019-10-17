// @flow
import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Button, Switch, Card, Select } from "antd";

import { Checkbox } from "components/forms/FormikWedgets";
import { setError } from "actions/appState";
import ErrorTip from "components/forms/ErrorTip";
import axios from "axios";
import R from "ramda";
import FormRow from "components/forms/FormRow";
// $FlowFixMe
import "./form.less";

type Props = {
  userData: mixed,
  permissions: Array<mixed>,
  doSubmit: Function
};
const userForm = (props: Props) => {
  const { doSubmit, userData, permissions } = props;

  const createOptions = R.map(p => (
    <Select.Option value={p.key} key={p.key}>
      {p.name}
    </Select.Option>
  ));

  return (
    <div>
      <Formik
        initialValues={userData}
        enableReinitialize
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          const newData = R.omit(["_id"], values);
          doSubmit(newData);
        }}
        render={({ errors, isValid, setFieldValue, values }) => (
          <Form className='container_col'>
            <FormRow
              field='name'
              labelText='使用者名稱'
              fieldProp={{ type: "text" }}
            />
            <FormRow
              field='email'
              labelText='E-Mail'
              fieldProp={{ type: "email" }}
            />
            <FormRow
              field='password'
              labelText='密碼'
              fieldProp={{ type: "password" }}
            />

            <FormRow
              field='passwordTip'
              labelText='密碼提示'
              fieldProp={{ type: "text" }}
            />

            <div className='form-row'>
              <label htmlFor='pkey'>權限設定:</label>
              <Select
                value={values["pkey"]}
                name='pkey'
                onChange={v => setFieldValue("pkey", v)}
              >
                {createOptions(permissions)}
              </Select>
            </div>

            <Button className='center' htmlType='submit'>
              送出
            </Button>
          </Form>
        )}
      />
    </div>
  );
};

export default userForm;
