import React from "react";
import { createRoot } from "react-dom/client";
import tagReducer from "./store";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";

const store = createStore(tagReducer);
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
