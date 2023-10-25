import "@/index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import MediaViewer from "@/components/MediaViewer/MediaViewer";
import store from "@/store/index.ts";

import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MediaViewer />
    <App />
  </Provider>,
);
