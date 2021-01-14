import { combineReducers } from "redux";
import authReducer from "./auth";
import appState from "./appState";
import ttsQueue from "./ttsQueue";

const RootReducer = (state, action) => {
  if (action.type === "PURGE") {
    return {};
  }
  return appReducer(state, action);
};
const appReducer = combineReducers({
  auth: authReducer,
  appState: appState,
  ttsQueue: ttsQueue,
});

export default RootReducer;
