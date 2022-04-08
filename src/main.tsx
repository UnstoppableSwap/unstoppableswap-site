import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { setupSocket } from "./socket";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

setupSocket();
