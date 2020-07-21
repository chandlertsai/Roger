// @flow
import React from "react";
import ErrorTip from "components/forms/ErrorTip";
import { Field, ErrorMessage } from "formik";
import { Input } from "antd";
// $FlowFixMe
import "./form.less";
type typeProp = {
  field: string,
  labelText: string,
  fieldProp: mixed,
};
const formRow = (props: typeProp) => {
  const { field, labelText, ...fieldProp } = props;

  return (
    <div className="form-row">
      <label htmlFor={field}>{`${labelText} :`}</label>
      <Field className="input" name={field} {...fieldProp} />
    </div>
  );
};

formRow.defaultProps = {
  fieldProp: { type: "text" },
};

export const InputRow = (props) => {
  const { values, setFieldValue, field } = props;
};
export default formRow;
