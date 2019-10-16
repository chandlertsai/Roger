// @flow
import React from "react";
import { Icon, Typography } from "antd";
import { connect } from "react-redux";
import { auth, authLogin } from "reducers/storeUtils";
import AvatorDropdown from "components/pureComponents/AvatorDropdown";
import { logout } from "actions/auth";
import type { ThunkAction } from "apis/types";

type Props = {
  showSidebar: boolean,
  toggleSidebar: Function,
  auth: mixed,
  logout: ThunkAction,
  alreadyLogin: boolean
};

const Navbar = (props: Props) => {
  const { showSidebar, toggleSidebar, auth, alreadyLogin, logout } = props;
  return (
    <div className='container'>
      <Typography.Title
        level={3}
        onClick={toggleSidebar}
        style={{ color: "white", flex: "1 0 200px", marginLeft: "0.5rem" }}
      >
        Eyesfree
      </Typography.Title>

      <AvatorDropdown
        alreadyLogin={alreadyLogin}
        username={auth.username}
        doLogout={logout}
      />
    </div>
  );
};

const mapState2Props = (state: mixed) => ({
  auth: auth(state),
  alreadyLogin: authLogin(state)
});

const mapDispatch2Props = (dispatch: Function) => ({
  logout: () => dispatch(logout())
});
export default connect(
  mapState2Props,
  mapDispatch2Props
)(Navbar);
