import { combineReducers } from "redux";
import authReducer from "./auth";
import appState from "./appState";

const RootReducer = combineReducers({
  auth: authReducer,
  appState: appState
});

export default RootReducer;
