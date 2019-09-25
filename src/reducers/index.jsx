import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./error";

const RootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer
});

export default RootReducer;
