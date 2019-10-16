// @flow
import React, { useState, useEffect } from "react";
import { Checkbox, Card, Button, Row, Col, Input } from "antd";
import { PermissionGroup } from "apis/auth";
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
const optionsUser = [
  { label: "License 序號管理", value: PermissionGroup.license },
  { label: "使用者資料管理", value: PermissionGroup.users },
  { label: "群組資料管理", value: PermissionGroup.group }
];

const optionsWarnning = [
  { label: "語音告警設定", value: PermissionGroup.settings.tts },
  { label: "異常訊息對應設定", value: PermissionGroup.settings.errorMessage },
  {
    label: "溫濕度監控參數設定",
    value: PermissionGroup.settings.specialMonitor
  }
];
const optionsDevice = [
  { label: "設備資料管理", value: PermissionGroup.device.information },
  { label: "設備廠商資料管理", value: PermissionGroup.device.vendor },
  { label: "設備即時狀態", value: PermissionGroup.device.monitor },
  { label: "設備異常紀錄", value: PermissionGroup.device.errorLog },
  { label: "設備維修紀錄", value: PermissionGroup.device.maintainLog },
  { label: "設備損壞記錄表", value: PermissionGroup.device.errorReport }
];

const toArry = R.map(R.prop("value"));
export const userArray = R.intersection(toArry(optionsUser));
export const warnningArray = R.intersection(toArry(optionsWarnning));
export const deviceArray = R.intersection(toArry(optionsDevice));

const abilityField = (props: Props) => {
  const { roleName, value, onChange, loading, submit, roleKey, del } = props;
  const [name, setName] = useState("");
  const [isCollapsing, setCollapsing] = useState(true);
  const checkChanged = name => fields => onChange(name)(fields);
  const onNameChanged = v => setName(v.target.value);

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
    <div className='form-card'>
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
              type='primary'
              loading={loading}
            >
              送出
            </Button>,
            <Button
              onClick={e => setCollapsing(true)}
              loading={loading}
              type='secondary'
            >
              取消
            </Button>,
            <Button
              onClick={e => del({ key: roleKey })}
              loading={loading}
              type='danger'
            >
              刪除
            </Button>
          ]}
        >
          <Card type='inner' title='使用者相關權限'>
            <Checkbox.Group
              options={optionsUser}
              defaultValue={value}
              onChange={checkChanged("user")}
            />
          </Card>
          <Card type='inner' title='告警相關權限'>
            <Checkbox.Group
              options={optionsWarnning}
              defaultValue={value}
              onChange={checkChanged("alarm")}
            />
          </Card>
          <Card type='inner' title='裝置相關權限'>
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
// export const mekePermisionFormRow = (permissions: Array<mixed>) => {
//   retrun();
// };
