// @flow
import React from "react";
import { Dropdown, Icon, Menu, Button } from "antd";
import { Link } from "react-router-dom";
//
type tProps = { onChanged: Function, lang: string };

const languageDropdown = (props: tProps) => {
  const { onChanged, lang } = props;
  const handleMenuClick = ({ key }) => {
    onChanged(key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="zh-TW">繁體中文</Menu.Item>
    </Menu>
  );

  const getLangText = lang => {
    switch (lang) {
      case "en":
        return "English";
      case "zh-TW":
        return "繁體中文";
      default:
        return "English";
    }
  };

  return (
    <div className="form-inline">
      <Dropdown trigger={["click"]} overlay={menu}>
        <div>
          <Button type="link" ghost>
            {getLangText(lang)}
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

languageDropdown.defaultProps = {
  lang: "en"
};

export default languageDropdown;
