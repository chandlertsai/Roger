import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import R from "ramda";
import ErrorTip from "./ErrorTip";

const validator = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});

const forgetPasswordForm = props => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validator}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
      render={({ errors, isValid }) => (
        <Form className='container'>
          <label htmlFor='name'>使用者帳號: </label>
          <Field name='username' type='text' />
          <ErrorMessage name='username' component={ErrorTip} />

          <Button
            className='center'
            htmlType='submit'
            disabled={!isValid}
            loading={loading}
          >
            送出
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

export default forgetPasswordForm;
