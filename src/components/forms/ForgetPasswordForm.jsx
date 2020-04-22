// @flow
import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Button, Input, Modal } from "antd";
import * as yup from "yup";
import R from "ramda";
import ErrorTip from "./ErrorTip";
import { useSendPasswordEmail } from "apis/crud";

const forgetPasswordForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [response, checkEmail] = useSendPasswordEmail("users");

  const onSubmit = (data) => {
    console.log(data);
    checkEmail({ email: data.email });
  };

  useEffect(() => {
    if (response.result === "Password sent") {
      Modal.success({ content: response.result });
    } else if (response.result != undefined) {
      Modal.error({ content: response.result });
    }
  }, [response]);

  const handleOk = (e) => {
    setModalVisible(false);
  };

  return (
    <div>
      <form className="container_col" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label htmlFor="email">登入 Email: </label>
          <input name="email" ref={register({ required: true })} />
        </div>
        <div className="form-row">
          {errors.email && <p>This field is required</p>}
        </div>

        <Button htmlType="submit"> submit</Button>
      </form>
    </div>
  );
};

export default forgetPasswordForm;
