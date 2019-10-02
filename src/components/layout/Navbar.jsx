// @flow
import React from "react";
import { Icon } from "antd";
import { connect } from "react-redux";
import { auth, authLogin } from "reducers/storeUtils";
import AvatorDropdown from "components/pureComponents/AvatorDropdown";

const Navbar = (props: { showSidebar: boolean, toggleSidebar: Function }) => {
  const { showSidebar, toggleSidebar, auth, alreadyLogin } = props;
  return (
    <div className='container'>
      <Icon
        type={showSidebar ? "menu-fold" : "menu-unfold"}
        onClick={toggleSidebar}
      />
      <h2 style={{ color: "white" }}>Eyesfree</h2>

      <AvatorDropdown alreadyLogin={alreadyLogin} username={auth.username} />
    </div>
  );
};

const mapState2Props = (state: mixed) => ({
  auth: auth(state),
  alreadyLogin: authLogin(state)
});
export default connect(mapState2Props)(Navbar);
