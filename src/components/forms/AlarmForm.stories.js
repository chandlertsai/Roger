import React from "react";
import AlarmForm from "./AlarmForm";

export default {
  title: "AlarmForm",
  decorators: [
    f => (
      <div store={{ width: 400 }} className="mx-auto my-5">
        {f()}
      </div>
    )
  ]
};

export const normal = () => (
  <AlarmForm
    alarm={{
      pollingInterval: 15,
      triggerType: "always",
      message: "Hello message!",
      conditions: [
        { name: "cond1", key: "cond1" },
        { name: "cond2", key: "cond2" }
      ]
    }}
  />
);
