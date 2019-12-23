import React from "react";
import LineChartCard from "./LineChartCard";

export default {
  title: "LineChartCard",
  decorators: [
    f => (
      <div className="mx-auto my-3" style={{ width: 400 }}>
        {f()}
      </div>
    )
  ]
};

export const typePrimary = () => (
  <LineChartCard
    cardInfo={{
      title: "PRIMARY",
      info: "primary information",
      type: "primary",
      data: [11, 22, 33]
    }}
  />
);

export const secondary = () => (
  <LineChartCard
    cardInfo={{
      title: "TITLE",
      info: "secondary information",
      type: "secondary",
      data: [12, 45, 22, 67, 89]
    }}
  />
);

export const success = () => (
  <LineChartCard
    cardInfo={{
      title: "TITLE",
      info: "information text",
      type: "success",
      data: [12, 45, 22, 67, 89]
    }}
  />
);

export const danger = () => (
  <LineChartCard
    cardInfo={{
      title: "DANGER",
      info: "Information text.",
      type: "danger",
      data: [12, 45, 22, 67, 89]
    }}
  />
);
