import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Router } from "react-router";
import history from "routers/history";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "store";
import { intercepteRefreshAxios, intercepteAuthRequest } from "apis/auth";
import MainFrame from "components/layout/MainFrame";
import initIcon from "components/fontawesome";
import "./app.less";

const App = props => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(pre => !pre);

  useEffect(() => {
    initIcon();
    intercepteRefreshAxios(store);
    intercepteAuthRequest(store);
  }, []);

  return (
    <Provider store={store}>
      <Router history={history}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <MainFrame showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        </PersistGate>
      </Router>
    </Provider>
  );
};

export default App;
