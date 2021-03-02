import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./redux";
import App from "./components/App";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
