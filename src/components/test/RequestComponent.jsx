// @flow
import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Button, Switch, Card } from "antd";
import { Checkbox } from "components/forms/FormikWedgets";
import ErrorTip from "components/forms/ErrorTip";
import { connect } from "react-redux";
import { authToken } from "reducers/storeUtils";
import { authFetch } from "actions/appState";
import R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { userKey } from "reducers/storeUtils";
import FormRow from "components/forms/FormRow";
import axios from "axios";
// testing alarm api
const testAlarm = () => {
  console.log("TESTING ALARM");
  axios
    .get("/webapi/api/" + "simplelogs", { params: { userKey: _userKey } })
    .then((res) => {
      let data = R.propOr([], "data")(res);
      console.log(data);
    })
    .catch((err) => {
      console.log("polling alarm error ", err);
    });
};

const requestComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [hasAuth, setAuth] = useState(true);
  const _userKey = useSelector(userKey);
  const { token, doSubmit, lastResponse } = props;
  return (
    <div>
      <Switch
        defaultChecked={hasAuth}
        onChange={(checked) => setAuth(checked)}
      />
      <Formik
        initialValues={{
          url: "",
          token: token,
          data: "",
          method: "GET",
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);

          doSubmit(values);
        }}
        render={({ errors, isValid }) => (
          <Form className="container_col">
            <FormRow field="url" labelText="API" fieldProp={{ type: "text" }} />
            <div className="form-row">
              <label htmlFor="method">Method: </label>
              <Field name="method" component="select">
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="POST">POST</option>
              </Field>
            </div>
            <FormRow
              field="data"
              labelText="Body"
              fieldProp={{ component: "textarea" }}
            />
            {hasAuth ? (
              <>
                <label htmlFor="token">token: </label>
                <Field name="token" type="text" />
              </>
            ) : null}

            <Button className="center" htmlType="submit" loading={loading}>
              送出
            </Button>
            <Button onClick={() => testAlarm()}> Test </Button>
          </Form>
        )}
      />
      <Card title="Last Response">{lastResponse}</Card>
    </div>
  );
};

const mapState2Props = (state) => ({
  token: authToken(state),
  lastResponse: R.path(["appState", "lastResponse"], state),
});

const mapDispatch2Props = (dispatch) => ({
  doSubmit: (values) => dispatch(authFetch(values)),
});
export default connect(mapState2Props, mapDispatch2Props)(requestComponent);
