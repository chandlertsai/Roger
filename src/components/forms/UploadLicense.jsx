// @flow
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from "actions/appState";
import { useLicense } from "apis/license";
import { message, Button } from "antd";
import { useTranslation } from "react-i18next";
import LicenseMessage from "components/pureComponents/licenseMessage";
import * as yup from "yup";

const validator = yup.object().shape({
  license: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
});

const uploadLicense = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, errors } = useForm({
    validationSchema: validator,
  });
  const { license, fetch } = useLicense();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    // var formData = new FormData();
    // const file = data.licenseFile && data.licenseFile && data.licenseFile[0];
    // formData.append("licenseFile", file);
    axios
      .post("/api/uploadlicense", data)
      .then((res) => message.info(JSON.stringify(res.data, null, 2)))
      .catch((err) => dispatch(setError(true, err)));
  };

  return (
    <div>
      <form className="container_col" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label htmlFor="license">{t("uploadLicense.uploadLabel")}</label>
          <textarea
            name="license"
            rows="5"
            style={{ width: "100%" }}
            ref={register}
          />
          {errors.license && (
            <p className="error">{t("error.requireLicense")}</p>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="name">{t("name")}</label>
          <input type="text" name="username" ref={register} />
          {errors.username && <p className="error">{t("error.requireName")}</p>}
        </div>
        <div className="form-row">
          <label htmlFor="password">{t("password")}</label>
          <input type="password" name="password" ref={register} />
          {errors.password && (
            <p className="error">{t("error.requirePassword")}</p>
          )}
        </div>

        <input type="submit" value={t("upload")} />
      </form>
      <LicenseMessage lic={license} />
    </div>
  );
};

export default uploadLicense;
