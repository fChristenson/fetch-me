import {App} from "./ts/App/App";
import React from "react";
import ReactDOM from "react-dom";
import { ContextProvider } from "./ts/store/store";

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>
, document.querySelector("#root"));
