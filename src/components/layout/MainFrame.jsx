import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ContentArea, Sidebar, Navbar } from "components/layout";
import { testRoutes } from "routers/testRoutes";
import { getSettingsRoutes } from "routers/settingsRoutes";
import { getNormalRoutes } from "routers/normalRoutes";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer, Sider } = Layout;
const mainFrame = ({ showSidebar, toggleSidebar }) => {
  const { t } = useTranslation();
  // i18n.on("languageChanged", lan => {
  //   console.log("language changed.", lan, Math.random());

  // });
  const settingsRoutes = getSettingsRoutes();
  const normalRoutes = getNormalRoutes();
  const submenus = [
    {
      name: t("systemInformation"),
      key: "sidebar_system_informations",
      icon: "info",
      items: normalRoutes
    },

    {
      name: t("systemSettings"),
      key: "sidebar_system_settings",
      icon: "setting",
      items: settingsRoutes
    },
    {
      name: t("test"),
      key: "sidbar_test",
      icon: "bug",
      items: testRoutes
    }
  ];

  return (
    <Layout sytel={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={!showSidebar}
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
