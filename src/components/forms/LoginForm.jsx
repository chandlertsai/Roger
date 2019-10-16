// @flow
import React, { useState } from "react";
import { Button } from "antd";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "actions/auth";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { default as ErrorDiv } from "./ErrorTip";
import { Redirect } from "react-router-dom";

import {
  loadingState,
  appStateHint,
  authText,
  authPasswordTip,
  authLogin
} from "reducers/storeUtils";
import * as yup from "yup";
import R from "ramda";
// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string()
});

const loginForm = props => {
  const { login, hint, text, history } = props;
  const dispatch = useDispatch();
  const loading = useSelector(loadingState);
  const passwordTip = useSelector(authPasswordTip);
  const hasLogin = useSelector(authLogin);
  return (
    <>
      {hasLogin ? (
        <Redirect to='/welcome' />
      ) : (
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validator}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            dispatch(loginUser(values));
          }}
          render={({ errors, isValid }) => (
            <Form className='container_col'>
              <label htmlFor='name'>使用者帳號: </label>
              <Field name='username' type='text' />
              <ErrorMessage name='username' component={ErrorDiv} />
              <label htmlFor='password'>登入密碼: </label>
              <Field name='password' type='password' />
              <ErrorMessage name='password' component={ErrorDiv} />
              <Link className='alignRight' to='/forgetPassword'>
                忘記密碼？
              </Link>
              <Button
                className='center'
                htmlType='submit'
                disabled={!isValid}
                loading={loading}
              >
                登入
              </Button>
            </Form>
          )}
        />
      )}
    </>
  );
};

export default withRouter(loginForm);
