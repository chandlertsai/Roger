// @flow
import React from "react";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//

const warningDropdown = (props: {
  alarmCount: number,
  messageCount: number,
  onSetting: () => {},
}) => {
  const { username, alreadyLogin, doLogout, changePassword } = props;
  const { t } = useTranslation();
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      console.log("key =", key);
      doLogout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="changepassword">
        <Link to="/resetpassword">更改密碼</Link>
      </Menu.Item>
      <Menu.Item key="logout">登出</Menu.Item>
    </Menu>
  );

  return (
    <div className="form-inline">
      <Dropdown trigger={["click"]} overlay={menu}>
        <div>
          <Button
            style={{ marginRight: "8px" }}
            ghost
            shape="circle"
            icon={<BellOutlined />}
          />
          <Button
            ghost
            danger
            style={{ marginRight: "16px" }}
            shape="circle"
            icon={<MessageOutlined />}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default warningDropdown;
