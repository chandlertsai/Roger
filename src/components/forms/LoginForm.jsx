// @flow
import React, { useState } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "actions/auth";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { default as ErrorDiv } from "./ErrorTip";
import { Redirect } from "react-router-dom";

import {
  loadingState,
  appStateHint,
  authText,
  authPasswordTip,
  authLogin,
} from "reducers/storeUtils";
import * as yup from "yup";
import R from "ramda";
// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  username: yup.string().required(),
  password: yup.string(),
});

const LForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { register, handleSubmit, watch, errors } = useForm({
    validationSchema: validator,
  });
  const loading = useSelector(loadingState);
  const passwordTip = useSelector(authPasswordTip);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container_col">
      <div className="form-row">
        <label htmlFor="username">{t("loginForm.username")}</label>
        <input type="text" name="username" defaultValue="" ref={register} />
      </div>
      {errors.username && <p className="error">{t("loginForm.usernameErr")}</p>}

      <div className="form-row">
        <label htmlFor="password">{t("loginForm.password")}</label>
        <input type="password" name="password" defaultValue="" ref={register} />
      </div>
      <div className="form-rwo">
        <Link className="alignRight" to="/forgetPassword">
          {t("loginForm.forgetpassword")}
        </Link>
      </div>
      <div className="form-rwo">
        <Link className="alignRight" to="/loginChangeLicense">
          {t("loginForm.uploadLicense")}
        </Link>
      </div>

      <Button className="center" htmlType="submit" loading={loading}>
        {t("login")}
      </Button>
    </form>
  );
};

const loginForm = (props) => {
  const hasLogin = useSelector(authLogin);
  return <>{hasLogin ? <Redirect to="/summary" /> : <LForm />}</>;
};

export default loginForm;
