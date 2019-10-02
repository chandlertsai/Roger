import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as yup from "yup";
import R from "ramda";
import ErrorTip from "./ErrorTip";

const validator = yup.object().shape({
  oripassword: yup.string().required(),
  newpassword: yup.string().required(),
  passwordConfirm: Yup.mixed()
    .test("match", "Passwords do not match", function(password) {
      return password === this.parent.passwordConfirm;
    })
    .required("Password confirm is required")
    
});

const resetPasswordForm = props => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validator}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
      render={({ errors, isValid }) => (
        <Form className='container'>
          <label htmlFor='oripassword'>舊登入密碼: </label>
          <Field name='oripassword' type='text' />
          <ErrorMessage name='oripassword' component={ErrorTip} />

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

export default resetPasswordForm;
