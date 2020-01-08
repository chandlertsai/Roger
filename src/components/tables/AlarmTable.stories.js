import React from "react";
import AlarmTable from "./AlarmTable";
import { Provider } from "react-redux";
import { store } from "store";
export default {
  title: "AlarmTable"
};

export const normal = () => <AlarmTable />;
