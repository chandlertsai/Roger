import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { compose, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import {
  privateRouteList,
  routeList,
  makePrivateRouters,
  makeRouters,
  rootRoute
} from "components/pages/router";
import "./app.less";
import MainLayout from "components/pages/MainLayout.jsx";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, {}, composeEnhancer());
console.log(store.getState());

const App = () => {
  return (
    <Router>
      <div>
        <Provider store={store}>
          {rootRoute}
          {makeRouters(routeList)}
          {makePrivateRouters(privateRouteList)}
        </Provider>
      </div>
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
