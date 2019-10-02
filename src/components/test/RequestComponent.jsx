// @flow
import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Button } from "antd";
import { Checkbox } from "components/forms/FormikWedgets";
import ErrorTip from "components/forms/ErrorTip";

const requestComponent = props => {
  const [loading, setLoading] = useState(false);
  const [hasAuth, setAuth] = useState(false);
  return (
    <Formik
      initialValues={{
        oripassword: "",
        newpassword: "",
        validnewpassword: "",
        passwordtip: ""
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
      }}
      render={({ errors, isValid }) => (
        <Form className='container_col'>
          <label htmlFor='api'>API: </label>
          <Field name='api' type='text' placeholder='/apis/v1/users' />
          {hasAuth ? (
            <>
              =<label htmlFor='token'>token: </label>
              <Field name='token' type='text' />
            </>
          ) : null}

          {/* <input
            type='checkbox'
            checked={hasAuth}
            onChange={e => setAuth(pre => !pre)}
          >
            use token
          </input> */}
          <Button className='center' htmlType='submit' loading={loading}>
            送出
          </Button>
        </Form>
      )}
    />
  );
};
export default requestComponent;
