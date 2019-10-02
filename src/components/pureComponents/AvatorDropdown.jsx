// @flow
import React from "react";
import { Dropdown, Icon, Menu, Button } from "antd";
import { Link } from "react-router-dom";
//

const menu = (
  <Menu>
    <Menu.Item key='changepassword'>
      <Link to='/forgetpassword'>更改密碼</Link>
    </Menu.Item>
    <Menu.Item key='logout'>登出</Menu.Item>
  </Menu>
);

const avatorDropdown = (props: {
  alreadyLogin: boolean,
  username: string,
  doLogout: Function,
  changePassword: Function
}) => {
  const { username, alreadyLogin, doLogout, changePassword } = props;
  return (
    <div className='alignRight'>
      {alreadyLogin ? (
        <Dropdown trigger={["click"]} overlay={menu}>
          <div>
            <Icon type='user' style={{ color: "white" }} />
            <Button type='link' ghost>
              {username}
            </Button>
            <Icon type='down' />
          </div>
        </Dropdown>
      ) : (
        <Link to='/login' style={{ color: "white" }}>
          登入
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
