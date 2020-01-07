import { configure, addDecorator } from "@storybook/react";
import React from "react";
import docs from "storybook-addon-react-flow-docgen/dist";
import { withI18next } from "storybook-addon-i18next";
import { Provider } from "react-redux";
import { store } from "store";
import i18n from "src/i18n";
import "antd/dist/antd.less";
global.STORYBOOK_REACT_CLASSES = {};
// addDecorator(docs());
addDecorator(f => <Provider store={store}>{f()}</Provider>);
addDecorator(
  withI18next({
    i18n,
    languages: {
      en: "English",
      "zh-TW": "繁體中文"
    }
  })
);

configure(require.context("../src", true, /\.stories\.js$/), module);
