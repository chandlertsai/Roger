import React, { useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { compose, createStore } from "redux";
import { connect, Provider } from "react-redux";
import rootReducer from "reducers";

import { Layout } from "antd";
import Navbar from "components/layout/Navbar";
import ContentArea from "components/layout/ContentArea";
import "./app.less";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, {}, composeEnhancer());
console.log(store.getState());

const { Header, Content, Footer, Sider } = Layout;

const App = props => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(pre => !pre);

  return (
    <Router>
      <Provider store={store}>
        <Layout sytel={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={!showSidebar}
            styel={{ background: "blue" }}
          >
            <h2>sider</h2>
          </Sider>

          <Layout>
            <Header style={{ background: "gray", padding: 0 }}>
              <Navbar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <ContentArea />
            </Content>
          </Layout>
        </Layout>
      </Provider>
    </Router>
  );
};

export default App;
