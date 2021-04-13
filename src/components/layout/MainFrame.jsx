import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ContentArea, Sidebar, Navbar } from "components/layout";
import { testRoutes } from "routers/testRoutes";
import { getPermissionRoutes } from "routers/permissionRoutes";
import { getPrivateRoutes } from "routers/privateRoutes";
import { useTranslation } from "react-i18next";
import R, { includes, filter } from "ramda";

const { Header, Content, Footer, Sider } = Layout;
const mainFrame = ({ showSidebar, toggleSidebar }) => {
  const { t } = useTranslation();

  const permissionRoutes = getPermissionRoutes();
  const privateRoutes = getPrivateRoutes();

  const dashboardMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/summary", "/device", "/message", "/alarm"]);
  }, privateRoutes);

  const reportMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/deviceSummary", "/deviceDetail", "/log"]);
  }, privateRoutes);

  const usersSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/usersSetting", "/groupSetting"]);
  }, permissionRoutes);

  const devicesSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/devicesSetting", "/vendorsSetting"]);
  }, permissionRoutes);

  const alarmsSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/alarmsSetting"]);
  }, permissionRoutes);

  const miscSettingMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/vendorsSetting", "/miscSetting"]);
  }, permissionRoutes);

  const systemManagementItems = filter((v) => {
    const key = v.to || "";
    return includes(key, [
      "/uploadLicense",
      "/permissionSetting",
      "/miscSetting",
    ]);
  }, permissionRoutes);

  const licenseMenuItems = filter((v) => {
    const key = v.to || "";
    return includes(key, ["/license"]);
  }, privateRoutes);

  const submenus = [
    {
      name: t("menu.dashboard"),
      key: "sidebar_dashboard",
      items: dashboardMenuItems,
    },
    {
      name: t("menu.report"),
      key: "sidebar_report",
      items: reportMenuItems,
    },

    {
      name: t("menu.usersSetting"),
      key: "sidebar_userSetting",
      items: usersSettingMenuItems,
    },
    {
      name: t("menu.devicesSetting"),
      key: "sidebar_devicesSetting",
      items: devicesSettingMenuItems,
    },
    {
      name: t("menu.alarmsSetting"),
      key: "sidebar_alarmsSetting",
      items: alarmsSettingMenuItems,
    },

    {
      name: t("menu.systemManagement"),
      key: "sidebar_system_menagement",
      items: systemManagementItems,
    },
    {
      name: t("menu.license"),
      key: "sidebar_license",
      items: licenseMenuItems,
    },
  ];

  return (
    <Layout sytel={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
        styel={{ background: "blue" }}
      >
        <Sidebar submenus={submenus} />
      </Sider>

      <Layout className="bg-light">
        <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

        <Content style={{ margin: "0 16px" }}>
          <ContentArea />
        </Content>
      </Layout>
    </Layout>
  );
};

export default mainFrame;
