import React from "react";
import { Link } from "react-router-dom";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Menu } from "antd";
import { t } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SubMenu = Menu.SubMenu;

const sidebar = ({ submenus }) => {
  const createSubMenu = (submenu) => (
    <SubMenu
      key={submenu.key}
      title={
        <span>
          {typeof submenu.icon === "string" ? (
            <LegacyIcon type={submenu.icon} />
          ) : (
            submenu.icon
          )}
          <span>{submenu.name}</span>
        </span>
      }
    >
      {submenu.items.map((submenuItem) => (
        <Menu.Item key={submenuItem.to}>
          <Link to={submenuItem.to}> {submenuItem.name} </Link>
        </Menu.Item>
      ))}
    </SubMenu>
  );

  return (
    <div>
      <Menu theme="dark" mode="inline" className="menu">
        {submenus.map((item) => createSubMenu(item))}
      </Menu>
    </div>
  );
};

export default sidebar;
