// @flow
import React from "react";
import { Icon } from "antd";
import { connect } from "react-redux";

const Navbar = (props: { showSidebar: boolean, toggleSidebar: Function }) => {
  const { showSidebar, toggleSidebar } = props;
  return (
    <div>
      <Icon
        className='trigger'
        type={showSidebar ? "menu-fold" : "menu-unfold"}
        onClick={toggleSidebar}
      />
      <span style={{ color: "white" }}>Eyesfree</span>
    </div>
  );
};

export default Navbar;
