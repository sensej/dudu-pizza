import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const docRoot = document.getElementById("root");

if (docRoot) {
  const root = ReactDOM.createRoot(docRoot);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
