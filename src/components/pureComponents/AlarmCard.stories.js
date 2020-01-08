import React from "react";
import AlarmCard from "./AlarmCard";
import "../../i18n";

export default {
  title: "AlarmCard",
  decorators: [
    f => (
      <div className="mx-auto my-3" style={{ width: 400 }}>
        {f()}
      </div>
    )
  ]
};

const _alarms = [
  { state: "read", time: "2019-12-25T16:15:28.449+08:00" },
  { state: "read", time: "2019-12-25T18:09:08.203+08:00" },
  { state: "ack", time: "2019-12-25T18:09:08.203+08:00" },
  { state: "close", time: "2019-12-25T18:09:08.203+08:00" },
  { state: "alarm", time: "2019-12-25T18:09:08.203+08:00" },
  { state: "alarm", time: "2019-12-25T18:09:08.203+08:00" },
  { state: "alarm", time: "2019-12-25T18:09:08.203+08:00" }
];

export const noInput = () => <AlarmCard />;

export const zeroAlarm = () => <AlarmCard alarms={[]} />;

export const threeAlarm = () => <AlarmCard alarms={_alarms} />;

export const ack = () => <AlarmCard alarms={_alarms} type="ack" />;
export const read = () => <AlarmCard alarms={_alarms} type="read" />;
export const close = () => <AlarmCard alarms={_alarms} type="close" />;
