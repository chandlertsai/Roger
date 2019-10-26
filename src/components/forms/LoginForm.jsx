// @flow
import React, { useState } from "react";
import { Button } from "antd";
import useForm from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "actions/auth";

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

const LForm = props => {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm({
    validationSchema: validator
  });
  const loading = useSelector(loadingState);
  const passwordTip = useSelector(authPasswordTip);

  const onSubmit = data => {
    dispatch(loginUser(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='container_col'>
      <div className='form-row'>
        <label htmlFor='username'>使用者帳號: </label>
        <input type='text' name='username' defaultValue='' ref={register} />
      </div>
      {errors.username && <p className='error'>使用者帳號為必要欄位</p>}

      <div className='form-row'>
        <label htmlFor='password'>登入密碼: </label>
        <input type='password' name='password' defaultValue='' ref={register} />
      </div>
      <Link className='alignRight' to='/forgetPassword'>
        忘記密碼？
      </Link>
      <Button className='center' htmlType='submit' loading={loading}>
        登入
      </Button>
    </form>
  );
};

const loginForm = props => {
  const hasLogin = useSelector(authLogin);
  return <>{hasLogin ? <Redirect to='/welcome' /> : <LForm />}</>;
};

export default loginForm;
