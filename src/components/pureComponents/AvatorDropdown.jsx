// @flow
import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//

const avatorDropdown = (props: {
  alreadyLogin: boolean,
  username: string,
  doLogout: Function,
  changePassword: Function
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
      {alreadyLogin ? (
        <Dropdown trigger={["click"]} overlay={menu}>
          <div>
            <UserOutlined style={{ color: "white" }} />
            <Button type="link" ghost>
              {username}
            </Button>
          </div>
        </Dropdown>
      ) : (
        <Link to="/login" className="btn btn-outline-success  ">
          {t("login")}
        </Link>
      )}
    </div>
  );
};

avatorDropdown.defaultProps = {
  doLogout: () => {},
  changePassword: () => {},
  username: "",
  alreadyLogin: false
};

export default avatorDropdown;
