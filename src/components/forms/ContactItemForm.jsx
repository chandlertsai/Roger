// @flow
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";

import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";

import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string(),
  mobile: yup.string(),
  fax: yup.string(),
  email: yup.string().email(),
  title: yup.string()
});

type tProps = {
  contact: mixed,
  doSubmit: Function
};

const contactItemForm = (props: tProps) => {
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: validator
  });

  const { contact, doSubmit, hideForm } = props;

  useEffect(() => {
    reset(contact);
  }, [contact]);
  const onSubmit = data => {
    console.log("contact item form submit ", data);
    const newData = R.pipe(R.mergeRight(contact), R.omit(["_id"]))(data);

    doSubmit(newData);
  };

  const createOptions = R.map(p => (
    <option value={p.key} key={p.key}>
      {p.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="col-auto">
          <label htmlFor="name">名稱: </label>
          <input
            className="form-control"
            type="text"
            name="name"
            ref={register}
          />
          {errors.name && <p className="error">名稱為必要欄位</p>}
        </div>

        <div className="col-auto">
          <label htmlFor="title">職稱: </label>
          <input
            className="form-control"
            type="text"
            name="title"
            ref={register}
          />
          {errors.title && <p className="error">職稱必須是字串</p>}
        </div>

        <div className="col-auto">
          <label htmlFor="sex">性別: </label>
          <select name="sex" className="custom-select" ref={register}>
            <option value="male">男</option>
            <option value="woman">女</option>
            <option value="undefined">不明</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email: </label>
        <input className="form-control" type="text" ref={register} />
      </div>
      {errors.email && <p className="error">email格式錯誤</p>}
      <div className="form-group">
        <label htmlFor="phone">電話: </label>
        <input
          className="form-control"
          type="text"
          name="phone"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">手機: </label>
        <input
          className="form-control"
          type="text"
          name="mobile"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">傳真: </label>
        <input className="form-control" type="text" name="fax" ref={register} />
      </div>
      <Button htmlType="submit" type="primary">
        更新
      </Button>
      <Button type="secondary" className="mx-1" onClick={hideForm}>
        取消
      </Button>
    </form>
  );
};

export default contactItemForm;
