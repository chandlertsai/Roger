// @flow
import React, { useState } from "react";
import { Button } from "antd";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { connect } from "react-redux";
import { loginAct, wrongLoginAct } from "actions/auth";
import { loginApi } from "apis/auth";
import { Redirect } from "react-router-dom";
import {
  loadingState,
  authHint,
  authText,
  authPasswordTip
} from "reducers/storeUtils";
import * as yup from "yup";
import R from "ramda";
// $FlowFixMe
import "./form.less";

const ErrorDiv = props => (
  <div className='entire_row' style={{ color: "red" }}>
    {props.children}
  </div>
);

const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string()
});

const loginForm = props => {
  const { loading, login, passwordTip, hint, text } = props;

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validator}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        login(values);
        // login(values).then(pass => {
        //   if (pass) {
        //     console.log("pass ",pass)
        //     <Redirect to='/welcome' />
        //   }
        // });
      }}
      render={({ errors, touched, isValid }) => (
        <Form>
          <label htmlFor='name'>使用者帳號: </label>
          <Field name='username' type='text' />
          <ErrorMessage name='username' component={ErrorDiv} />
          <label htmlFor='password'>登入密碼: </label>
          <Field name='password' type='password' />
          <ErrorMessage name='password' component={ErrorDiv} />
          <Button htmlType='submit' disabled={!isValid} loading={loading}>
            Submit
          </Button>
          {hint ? (
            <>
              <p className='center warning'>提示: {passwordTip}</p>
              <p className='center'>{text}</p>
            </>
          ) : null}
        </Form>
      )}
    />
  );
};

const mapStateToProps = state => ({
  loading: loadingState(state),
  hint: authHint(state),
  text: authText(state),
  passwordTip: authPasswordTip(state)
});

const mapDispatchToProps = dispatch => {
  return {
    login: auth => {
      return loginApi(auth)
        .then(user => {
          console.log("response :", user);
          if (user.success) {
            dispatch(loginAct(user));
          } else {
            dispatch(wrongLoginAct(user));
          }
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    }
  };
};

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(loginForm);

export default LoginForm;
