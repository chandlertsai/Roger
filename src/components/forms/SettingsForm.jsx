import React, { useState, useEffect } from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Spin,
  InputNumber,
  Typography,
  notification,
} from "antd";

import { useTranslation } from "react-i18next";

import { setError } from "actions/appState";
import axios from "axios";
import R from "ramda";
const { Option } = Select;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const defaultValus = {
  abuseIP: {
    abuseScore: 10,
    key:
      "bada8bd759fa6b5eced0e1c1b3213a743e796d27d8333034c6e1e1cf862c59c994f92ca355aff4a7",
  },
  simplelog: {
    abuseIPVoice: true,
    rawTextVoice: true,
  },
};

export default () => {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("/webapi/api/settings")
      .then((res) => {
        const data = R.propOr(defaultValus, "data", res);
        console.log("res ", data);
        form.setFieldsValue(data);
      })
      .catch((err) => form.setFieldsValue(defaultValus))
      .finally(setLoading(false));
  }, []);

  const onFinish = (values) => {
    console.log("CCC", values);
    axios
      .post("/webapi/api/settings", values)
      .then((res) => {
        notification.open({
          message: "done",
          description: "OK", //JSON.stringify(res.data, null, 2)
        });
      })
      .catch((err) =>
        notification.error({
          duration: 0,
          message: "error",
          description: err.message,
        })
      );
  };
  return (
    <div>
      <Spin spinning={loading}>
        <Title level={3}>{t("systemSettings")}</Title>
        <Form form={form} {...layout} name="settings-form" onFinish={onFinish}>
          <Form.Item
            name={["abuseIP", "abuseScore"]}
            label={t("settings.abuseConfidenceScore")}
            extra={t("settings.abuseScoreNote")}
          >
            <InputNumber max={100} min={0} />
          </Form.Item>
          <Form.Item name={["abuseIP", "key"]} label={"Key"}>
            <Input />
          </Form.Item>
          <Form.Item
            name={["simplelog", "abuseIPVoice"]}
            valuePropName="checked"
          >
            <Checkbox>{t("settings.abuseIPVoice")}</Checkbox>
          </Form.Item>
          <Form.Item
            name={["simplelog", "rawTextVoice"]}
            valuePropName="checked"
          >
            <Checkbox>{t("settings.rawTextVoice")}</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {t("submit")}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
