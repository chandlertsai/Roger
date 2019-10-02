import React, { useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "store";

import { Layout } from "antd";
import { ContentArea, Sidebar, Navbar } from "components/layout";
import "./app.less";

const { Header, Content, Footer, Sider } = Layout;

const App = props => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(pre => !pre);

  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <Layout sytel={{ minHeight: "100vh" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={!showSidebar}
              styel={{ background: "blue" }}
            >
              <Sidebar />
            </Sider>

            <Layout>
              <Header style={{ background: "gray", padding: 0 }}>
                <Navbar
                  showSidebar={showSidebar}
                  toggleSidebar={toggleSidebar}
                />
              </Header>
              <Content style={{ margin: "0 16px" }}>
                <ContentArea />
              </Content>
            </Layout>
          </Layout>
        </PersistGate>
      </Provider>
    </Router>
  );
};

export default App;
