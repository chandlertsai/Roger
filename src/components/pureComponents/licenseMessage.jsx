import React from "react";
import { useFetch } from "apis/crud";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import R from "ramda";

const licenseMessage = () => {
  const [lic] = useFetch("licenseMessage");
  const { t } = useTranslation();
  // const licenseItems = lic => {
  //   const license = R.compose(R.prop("license"), R.head)(lic);
  //   return R.map(i=>
  //     <li class="list-group-item">{t("licenseMessage")}</li>
  //   ,license)
  // };
  const columns = [
    {
      title: t("licenseMessage.expire"),
      dataIndex: "expire",
      key: "expire"
    },
    {
      title: t("licenseMessage.count"),
      dataIndex: "count",
      key: "count"
    }
  ];

  return (
    <div className="card p-2">
      <h5 className="card-title"> {t("licenseMessage.title")} </h5>
      <h6 className="card-text">
        {t("licenseMessage.company")} : {R.prop("company", R.head(lic))}
      </h6>

      <Table dataSource={R.prop("license", R.head(lic))} columns={columns} />
      <p className="card-text">
        {t("licenseMessage.contact")} : {R.prop("support", R.head(lic))}
      </p>
    </div>
  );
};

export default licenseMessage;
