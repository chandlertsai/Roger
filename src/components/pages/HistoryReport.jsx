import React, { useState, useEffect } from "react";
import { Select, Spin, Row, Col, Button } from "antd";
import { useFetch } from "apis/crud";
import { useDebounce } from "apis/utils";
import { useTranslation } from "react-i18next";
var qs = require("qs");
import axios from "axios";
import R from "ramda";
import AlarmHistoryTable from "components/tables/AlarmHistoryTable";
import DeviceHistoryReport from "components/pureComponents/DeviceHistoryReport";
export default () => {
  const [tableData, remove, update, query] = useFetch("devices");
  const [fetching, setFetching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentDevice, setCurrentDevice] = useState();
  const [deviceInfo, setDeviceInfo] = useState();
  const [alarmHistory, setAlarmHistory] = useState();
  const [reportVisiable, setReportVisiable] = useState(false);

  const { t } = useTranslation();
  const handleChange = (v) => {
    if (R.isNil(v)) return;
    setCurrentDevice(v);
  };

  const makeHistoryReport = (data) => {
    alarms = R.prop("alarms")(data);
  };

  const debuglog = R.tap((x) => console.log("DEBUG====> ", x));

  const alarmKeyList = R.map(R.pick(["key"]));
  const getAlarmkeys = R.pipe(
    alarmKeyList,
    R.map((v) => v.key)
  );

  // reducer used in reduce() to calculate elapsed times
  const calculateElapsed = (a, v) => {
    const { state, lastTS } = v;
    const { lastState, lastStateTS, alarmElapse, ackElapse, closeElapse } = a;
    if (lastState === "begin") {
      return R.mergeLeft(
        {
          lastStateTS: lastTS,
          lastState: state,
        },
        a
      );
    }

    const startDate = new Date(lastStateTS);
    const endDate = new Date(lastTS);
    const elapsed = endDate - startDate;

    let acc = R.mergeLeft({ lastStateTS: lastTS, lastState: state }, a);

    switch (lastState) {
      case "alarm":
        acc.alarmElapse = alarmElapse + elapsed;
        break;
      case "ack":
        acc.ackElapse = alarmElapse + elapsed;
        break;
      case "close":
        acc.closeElapse = alarmElapse + elapsed;
        break;
    }
    return acc;
  };

  const makeReport = async () => {
    setFetching(true);
    try {
      const deviceReponse = await axios.get("webapi/api/devices", {
        params: { key: R.prop("value")(currentDevice) },
      });

      const reportdata = {
        device: R.head(deviceReponse.data),
      };
      setDeviceInfo(R.prop("device", reportdata));
      const alarms = R.pathOr([], ["device", "alarms"])(reportdata);
      const alarmkeys = getAlarmkeys(alarms);
      //console.log("alarms: ", alarms);

      const deviceResponse = await axios.get("webapi/api/alarmHistory", {
        params: { key: alarmkeys },
        paramsSerializer: (params) => {
          return qs.stringify(params, { indices: false });
        },
      });

      const alarmHistory = R.compose(
        R.sortBy(R.prop("index")),
        R.propOr([], "data")
      )(deviceResponse);

      const combineAlarmAndHistory = R.map((v) => {
        let history = R.filter(R.propEq("key", v))(alarmHistory);
        history = R.append({ state: "end", lastTS: Date.now() }, history);
        const alarm = R.find(R.propEq("key", v))(alarms);

        const historyResult = R.reduce(calculateElapsed, {
          alarmElapse: 0,
          ackElapse: 0,
          closeElapse: 0,
          lastState: "begin",
          lastStateTS: 0,
        })(history);

        return R.mergeLeft(
          alarm,
          R.mergeLeft(historyResult, { history: history })
        );
      }, alarmkeys);

      setAlarmHistory(combineAlarmAndHistory);
      setReportVisiable(true);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Select
            labelInValue
            showSearch
            value={currentDevice}
            placeholder={t("device.selectDevice")}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={query}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {R.map((v) => (
              <Select.Option key={v.key}>{v.name + " | " + v.ip}</Select.Option>
            ))(tableData || [])}
          </Select>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={makeReport}
            loading={fetching}
            disabled={currentDevice ? false : true}
          >
            Report
          </Button>
        </Col>
      </Row>

      {reportVisiable ? (
        <DeviceHistoryReport
          handleClose={() => setReportVisiable(false)}
          deviceInfo={deviceInfo}
          alarmHistoryInfo={alarmHistory}
        />
      ) : null}
    </div>
  );
};
