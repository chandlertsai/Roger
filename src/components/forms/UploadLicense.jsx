// @flow
import React from "react";
import useForm from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setError } from "actions/appState";
import { useTranslation } from "react-i18next";
const uploadLicense = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => {
    var formData = new FormData();
    const file = data.licenseFile && data.licenseFile && data.licenseFile[0];
    formData.append("licenseFile", file);
    axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => console.log(res.data))
      .catch(err => dispatch(setError(true, err)));
  };

  return (
    <form
      className="container_col"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      // action='/api/upload'
      // method='post'
    >
      <div className="form-row">
        <label htmlFor="licenseFile">{t("selectLicenseFile")}</label>
        <input type="file" name="licenseFile" ref={register} />
      </div>

      <input type="submit" value={t("upload")} />
    </form>
  );
};

export default uploadLicense;
