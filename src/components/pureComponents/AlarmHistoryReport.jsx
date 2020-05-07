// @flow
import React, { useState } from "react";

import { Row, Col, Typography, Table, Button, Descriptions } from "antd";
import { useTranslation } from "react-i18next";
import useDeepCompareEffect from "use-deep-compare-effect";
import DoughnutChart from "components/pureComponents/DoughnutChart";
import { ISODateToString } from "apis/utils";
import R from "ramda";

type tProp = {
  alarmHistoryInfo: Array<mixed>,
};

// calculate sum of property
const sumOfProp = (prop) =>
  R.reduce((a, v) => {
    return a + R.prop(prop)(v);
  }, 0);

function msToTime(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24));

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return (days ? days + "D " : "") + hours + "H " + minutes + "M";
}

function renderElapsedTimeCell(text, record, index) {
  return <span>{msToTime(text)}</span>;
}

export default (props: tProp) => {
  const [showHistory, setShowHistory] = useState(false);
  const [currentHistory, setCurrentHistory] = useState(false);
  const [chartData, setChartData] = useState();
  const { alarmHistoryInfo } = props;
  const { t } = useTranslation();

  useDeepCompareEffect(() => {
    setShowHistory(false);
    setChartData({
      datasets: [
        {
          data: [
            parseInt(sumOfProp("alarmElapse")(alarmHistoryInfo)),
            parseInt(sumOfProp("ackElapse")(alarmHistoryInfo)),
            parseInt(sumOfProp("closeElapse")(alarmHistoryInfo)),
          ],
          backgroundColor: ["red", "orange", "green"],
          label: "Dataset 1",
        },
      ],
      labels: [
        t("alarmHistoryTable.alarm"),
        t("alarmHistoryTable.ack"),
        t("alarmHistoryTable.close"),
      ],
    });
  }, [alarmHistoryInfo]);
  const historyColumns = [
    { title: t("alarmHistoryTable.index"), dataIndex: "index", key: "index" },
    {
      title: t("alarmHistoryTable.lastTS"),
      dataIndex: "lastTS",
      key: "lastTS",
    },

    {
      title: t("state"),
      dataIndex: "state",
      key: "state",
    },
    {
      title: t("alarmHistoryTable.ackUser"),
      dataIndex: "ackUser",
      key: "ackUser",
    },
  ];

  const columns = [
    { title: t("alarm.name"), dataIndex: "name", key: "name" },
    {
      title: t("alarm.message"),
      dataIndex: "message",
      key: "message",
    },
    {
      title: t("alarmHistoryTable.totalAlarmElapse"),
      dataIndex: "alarmElapse",
      key: "alarmElapse",
      render: renderElapsedTimeCell,
    },

    {
      title: t("alarmHistoryTable.totalAckElapse"),
      dataIndex: "ackElapse",
      key: "ackElapse",
      render: renderElapsedTimeCell,
    },
    {
      title: t("alarmHistoryTable.totalCloseElapse"),
      dataIndex: "closeElapse",
      key: "closeElapse",
      render: renderElapsedTimeCell,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Button
            size="small"
            onClick={() => {
              setShowHistory(true);
              setCurrentHistory(record.history);
            }}
          >
            list..
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <Row gutter={[16, 16]}>
        <h5>Each alarm's result</h5>
        <Col span={24}>
          <Table
            dataSource={alarmHistoryInfo}
            columns={columns}
            size="small"
            pagination={false}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <DoughnutChart data={chartData} />
        </Col>
        <Col span={18}>
          <Descriptions title={t("alarmHistoryTable.deviceResult")}>
            <Descriptions.Item label={t("alarmHistoryTable.totalAlarm")}>
              {alarmHistoryInfo.length}
            </Descriptions.Item>
            <Descriptions.Item label={t("alarmHistoryTable.totalAlarmElapse")}>
              {msToTime(sumOfProp("alarmElapse")(alarmHistoryInfo))}
            </Descriptions.Item>
            <Descriptions.Item label={t("alarmHistoryTable.totalAckElapse")}>
              {msToTime(sumOfProp("ackElapse")(alarmHistoryInfo))}
            </Descriptions.Item>
            <Descriptions.Item label={t("alarmHistoryTable.totalCloseElapse")}>
              {msToTime(sumOfProp("closeElapse")(alarmHistoryInfo))}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      {showHistory ? (
        <Row gutter={[16, 16]}>
          <Table
            dataSource={currentHistory}
            columns={historyColumns}
            size="small"
            pagination={false}
          />
        </Row>
      ) : null}
    </div>
  );
};
