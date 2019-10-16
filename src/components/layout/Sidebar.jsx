import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "antd";
import { testRoutes } from "routers/testRoutes";
import { settingsRoutes } from "routers/settingsRoutes";
const SubMenu = Menu.SubMenu;

// const defaultOpenKey = menu => {
//   if (menu[0]) {
//     return menu[0].key.toString();
//   }
//   return "0";
// };

const createSubMenu = submenu => (
  <SubMenu
    key={submenu.key}
    title={
      <span>
        {typeof submenu.icon === "string" ? (
          <Icon type={submenu.icon} />
        ) : (
          React.createElement(submenu.icon)
        )}
        <span>{submenu.name}</span>
      </span>
    }
  >
    {submenu.items.map(submenuItem => (
      <Menu.Item key={submenuItem.to}>
        <Link to={submenuItem.to}> {submenuItem.name} </Link>
      </Menu.Item>
    ))}
  </SubMenu>
);

const submenus = [
  {
    name: "測試",
    key: "sidbar_test",
    icon: "bug",
    items: testRoutes
  },
  {
    name: "系統設定",
    key: "sidebar_system_settings",
    icon: "setting",
    items: settingsRoutes
  }
];

const sidebar = () => {
  return (
    <div>
      <Menu
        theme='dark'
        mode='inline'
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={[defaultOpenKey(submenus)]}
        className='menu'
      >
        {submenus.map(item => createSubMenu(item))}
      </Menu>
    </div>
  );
};

export default sidebar;
