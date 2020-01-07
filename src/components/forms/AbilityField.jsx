// @flow
import React, { useState, useEffect } from "react";
import { Checkbox, Card, Button, Row, Col, Input } from "antd";
import { useTranslation } from "react-i18next";
import { PermissionGroup } from "apis/auth";
import i18n from "src/i18n";
import R from "ramda";

type Props = {
  roleName: string,
  value: mixed,
  onChange: Function,
  loading: boolean,
  submit: Function,
  del: Function,
  roleKey: string
};

// const onChange = v => console.log(v);

// const toArry = R.map(R.prop("value"));

const abilityField = (props: Props) => {
  const { roleName, value, onChange, loading, submit, roleKey, del } = props;
  const [name, setName] = useState("");
  const [isCollapsing, setCollapsing] = useState(true);
  const checkChanged = name => fields => onChange(name)(fields);
  const onNameChanged = v => setName(v.target.value);
  const { t } = useTranslation();

  const optionsUser = [
    { label: t("userPermission.license"), value: PermissionGroup.license },
    { label: t("userPermission.users"), value: PermissionGroup.users },
    { label: t("userPermission.group"), value: PermissionGroup.group }
  ];

  const optionsWarnning = [
    {
      label: t("alarmPermission.tts"),
      value: PermissionGroup.settings.tts
    },
    {
      label: t("alarmPermission.errorMessage"),
      value: PermissionGroup.settings.errorMessage
    },
    {
      label: t("alarmPermission.specialMonitor"),
      value: PermissionGroup.settings.specialMonitor
    }
  ];
  const optionsDevice = [
    {
      label: t("devicePermission.information"),
      value: PermissionGroup.device.information
    },
    {
      label: t("devicePermission.vendor"),
      value: PermissionGroup.device.vendor
    },
    {
      label: t("devicePermission.monitor"),
      value: PermissionGroup.device.monitor
    },
    {
      label: t("devicePermission.errorLog"),
      value: PermissionGroup.device.errorLog
    },
    {
      label: t("devicePermission.maintainLog"),
      value: PermissionGroup.device.maintainLog
    },
    {
      label: t("devicePermission.errorReport"),
      value: PermissionGroup.device.errorReport
    },
    {
      label: t("devicePermission.alarm"),
      value: PermissionGroup.device.alarm
    }
  ];

  const nameNode = name => (
    <Input
      value={name}
      onChange={onNameChanged}
      onFocus={() => setCollapsing(false)}
    />
  );

  useEffect(() => {
    setName(roleName);
  }, [roleName]);

  return (
    <div className="form-card">
      {isCollapsing ? (
        nameNode(name)
      ) : (
        <Card
          loading={loading}
          title={nameNode(name)}
          actions={[
            <Button
              onClick={e => {
                setCollapsing(true);
                submit({ name, key: roleKey, abilities: value });
              }}
              type="primary"
              loading={loading}
            >
              {t("submit")}
            </Button>,
            <Button
              onClick={e => setCollapsing(true)}
              loading={loading}
              type="secondary"
            >
              {t("cancel")}
            </Button>,
            <Button
              onClick={e => del({ key: roleKey })}
              loading={loading}
              type="danger"
            >
              {t("delete")}
            </Button>
          ]}
        >
          <Card type="inner" title={t("userPermission.title")}>
            <Checkbox.Group
              options={optionsUser}
              defaultValue={value}
              onChange={checkChanged("user")}
            />
          </Card>
          <Card type="inner" title={t("alarmPermission.title")}>
            <Checkbox.Group
              options={optionsWarnning}
              defaultValue={value}
              onChange={checkChanged("alarm")}
            />
          </Card>
          <Card type="inner" title={t("devicePermission.title")}>
            <Checkbox.Group
              options={optionsDevice}
              defaultValue={value}
              onChange={checkChanged("device")}
            />
          </Card>
        </Card>
      )}
    </div>
  );
};

abilityField.defaultProps = {
  value: []
};

export default abilityField;
