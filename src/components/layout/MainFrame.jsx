import React from "react";
import { Layout } from "antd";
import { ContentArea, Sidebar, Navbar } from "components/layout";
const { Header, Content, Footer, Sider } = Layout;
const mainFrame = ({ showSidebar, toggleSidebar }) => (
  <Layout sytel={{ minHeight: "100vh" }}>
    <Sider
      trigger={null}
      collapsible
      collapsed={!showSidebar}
      styel={{ background: "blue" }}
    >
      <Sidebar />
    </Sider>

    <Layout className='bg-light'>
      <Header style={{ background: "gray", padding: 0 }}>
        <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </Header>
      <Content style={{ margin: "0 16px" }}>
        <ContentArea />
      </Content>
    </Layout>
  </Layout>
);

export default mainFrame;
