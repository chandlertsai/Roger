import React from "react";
// $FlowFixMe
import "./form.less";

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// <Checkbox />
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type='checkbox'
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className='radio-button'
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

export { Checkbox };
