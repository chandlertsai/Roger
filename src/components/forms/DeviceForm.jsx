// @flow
import React, { useState } from "react";
import { Button } from "antd";
import useForm from "react-hook-form";
import { useDispatch } from "react-redux";
import R from "ramda";
import { default as ErrorDiv } from "./ErrorTip";

import {
  loadingState,
  appStateHint,
  authText,
  authPasswordTip,
  authLogin
} from "reducers/storeUtils";
import * as yup from "yup";

// $FlowFixMe
import "./form.less";

const validator = yup.object().shape({
  name: yup.string().required(),
  ip: yup.string().matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message: "Invalid IP address",
    excludeEmptyString: true
  })
});

const deviceForm = props => {
  console.log(props);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm({
    validationSchema: validator
  });

  const { users, vendors, device, doSubmit } = props;
  const { name, ip, userkey, vendorkey, key } = device;

  const onSubmit = data => {
    const newData = R.pipe(
      R.mergeRight(device),
      R.omit(["_id"])
    )(data);

    console.log("device form submit ", newData);
    doSubmit(newData);
  };

  const createOptions = R.map(p => (
    <option value={p.key} key={p.key}>
      {p.name}
    </option>
  ));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label htmlFor='name'>設備名稱: </label>
        <input
          className='form-control'
          type='text'
          name='name'
          defaultValue={name}
          ref={register}
        />
      </div>
      {errors.name && <p className='error'>設備名稱為必要欄位</p>}

      <div className='form-group'>
        <label htmlFor='type'>類型: </label>
        <select name='type' className='custom-select' ref={register}>
          <option value='NormalNetwork'>一般網路設備</option>
          <option value='Monitor'>數據監控設備</option>
          <option value='SimpleDevice'>簡易資料設備</option>
        </select>
      </div>

      <div className='form-group'>
        <label htmlFor='ip'>IP 位址: </label>
        <input
          className='form-control'
          type='text'
          name='ip'
          defaultValue={ip}
          ref={register}
        />
      </div>
      <small className='form-text text-muted'>ex: 192.168.0.1</small>
      {errors.ip && <p className='error'> IP位址格式錯誤</p>}

      <div className='form-group'>
        <label htmlFor='userkey'>設備負責人: </label>
        <select name='userkey' className='custom-select' ref={register}>
          {createOptions(users)}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='vendorkey'>供應商: </label>
        <select name='vendorkey' className='custom-select' ref={register}>
          {createOptions(vendors)}
        </select>
      </div>

      <Button htmlType='submit'> 確定 </Button>
    </form>
  );
};

export default deviceForm;
