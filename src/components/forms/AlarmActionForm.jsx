// @flow
import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import { useTranslation } from "react-i18next";
import R from "ramda";

import { uniqueKey } from "apis/utils";

export default props => {
  const { action, onChanged } = props;
  const { t } = useTranslation();

  return (
    <div className="form=group">
      <label intlFor="payload">{t("alarm.devStatusActionTip")}</label>
      <input
        className="form-control"
        type="text"
        name="payload"
        value={action.payload}
        onChange={e => onChanged(e.target.value)}
      />
    </div>
  );
};
