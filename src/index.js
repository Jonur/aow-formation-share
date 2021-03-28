import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import { HelmetProvider } from "react-helmet-async";
import store from "./redux";
import App from "./components/App";
import "./index.css";

const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <DndProvider options={HTML5toTouch}>
          <App />
        </DndProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
