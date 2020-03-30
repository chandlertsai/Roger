// @flow

import React, { useState, useEffect } from "react";
import { useFetch, useNameList, getName } from "apis/crud";
import { useDevices } from "apis/device";
import { useTranslation } from "react-i18next";
import { EditOperationCell } from "components/pureComponents/TableCells";
import { uniqueKey } from "apis/utils";
import { setLoading, setError } from "actions/appState";
import { Table, Row, Col, Popover } from "antd";
import TableToolbar from "components/pureComponents/TableToolbar";
import { useLicense } from "apis/license";
import "./table.css";
import R from "ramda";

// props type
type Props = {
  dispatch: Function,
  data: mixed
};

export default (props: Props) => {
  const { data } = props;
  const [selectDevice, setSelectDevice] = useState({});
  const [selectIndex, setSelectIndex] = useState(-1);
  const license = useLicense();
  const { t } = useTranslation();
  const [licenseInfo, setLicenseInfo] = useState("");
  const usersNameList = useNameList("users");
  const [vendorList, rv, uv] = useFetch("vendors");

  useEffect(() => {
    const length = data ? data.length : 0;

    setLicenseInfo(t("device.avialable") + length + "/" + license.permitCount);
  }, [license, data]);

  const alarmColumns = [
    {
      title: t("alarm.name"),
      dataIndex: "name",
      key: "name"
    },
    {
      title: "state",
      dataIndex: "state",
      key: "state"
    }
  ];
  const columns = [
    {
      title: t("device.name"),
      dataIndex: "name",
      key: "name"
    },

    {
      title: t("ip"),
      dataIndex: "ip",
      key: "ip"
    },
    {
      title: t("device.contact"),
      dataIndex: "userkey",
      key: "userkey",
      render: userkey => getName(userkey)(usersNameList)
    },
    {
      title: t("device.vendor"),
      dataIndex: "vendorkey",
      key: "vendorkey",
      render: vkey => {
        const vendor = R.find(R.propEq("key", vkey))(vendorList) || {};

        const content = (
          <div>
            <p>TEL:{vendor.phone}</p>
            <p>Email:{vendor.email}</p>
          </div>
        );
        return (
          <Popover title={vendor.name} content={content}>
            {vendor.name}
          </Popover>
        );
      }
    },

    {
      title: "#Alarm",
      key: "alarms",
      dataIndex: "alarms",

      render: (text, record) => {
        const stateCount = R.countBy(R.prop("state"))(text || []);
        return <span>{stateCount["alarm"]}</span>;
      }
    }
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col sx={24} span={12}>
          <Table
            size="small"
            columns={columns}
            dataSource={data}
            rowClassName={(record, index) => {
              if (index == selectIndex) return "bg-blue";
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setSelectDevice(record);
                  setSelectIndex(rowIndex);
                } // click row
              };
            }}
          />
        </Col>
        <Col sx={24} span={12}>
          <Table
            size="small"
            columns={alarmColumns}
            dataSource={R.prop("alarms")(selectDevice)}
          />
        </Col>
      </Row>
    </div>
  );
};
