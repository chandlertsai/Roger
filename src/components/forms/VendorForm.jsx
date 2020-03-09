// @flow
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";

import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string(),
  email: yup.string().email()
});

type tProps = {
  vendor: mixed,
  doSubmit: Function
};

const vendorForm = (props: tProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: validator
  });

  const { vendor, doSubmit } = props;

  useEffect(() => {
    reset(vendor);
  }, [vendor]);

  const onSubmit = data => {
    const newData = R.pipe(R.mergeRight(vendor), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">供應商名稱: </label>
        <input
          className="form-control"
          type="text"
          name="name"
          ref={register}
        />
      </div>
      {errors.name && <p className="error">名稱為必要欄位</p>}

      <div className="form-group">
        <label htmlFor="ip">供應商電話: </label>
        <input
          className="form-control"
          type="text"
          name="phone"
          ref={register}
        />
      </div>

      <div className="form-group">
        <label htmlFor="ip">供應商Email: </label>
        <input
          className="form-control"
          type="email"
          name="email"
          ref={register}
        />
      </div>
      {errors.name && <p className="error">email格式錯誤</p>}

      <Button htmlType="submit"> 確定 </Button>
    </form>
  );
};

export default vendorForm;
