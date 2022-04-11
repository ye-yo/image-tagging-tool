import tagReducer from "./store";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tagList"],
};

const rootReducer = persistReducer(persistConfig, tagReducer);
export const store = createStore(rootReducer);
export const persistor = persistStore(store);
