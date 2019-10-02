import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "reducers";
import thunk from "redux-thunk";
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let store = createStore(
//   rootReducer,
//   {},
//   composeEnhancer(applyMiddleware(thunk))
// );

export const store = createStore(
  pReducer,
  {},
  composeEnhancer(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
