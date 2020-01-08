import React from "react";
import AlarmControlPanel from "./AlarmControlPanel";

export default {
  title: "AlarmControlPanel",
  decorators: [
    f => (
      <div store={{ width: "40%" }} className="mx-auto my-5">
        {f()}
      </div>
    )
  ]
};

export const normal = () => (
  <AlarmControlPanel
    alarm={{
      name: "AlarmTest1",
      ip: "192.168.99.99",
      message: "Warning !! alarm test",
      time: "2019-12-25T18:16:53.217+08:00",
      state: "alarm"
    }}
  />
);
