import React from "./_snowpack/pkg/react.js";
import ReactDOM from "./_snowpack/pkg/react-dom.js";
import App from "./App.js";
import Login from "./Login.js";
import {BrowserRouter, Route, Routes} from "./_snowpack/pkg/react-router-dom.js";
var mountNode = document.getElementById("app");
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(BrowserRouter, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
  path: "/",
  element: /* @__PURE__ */ React.createElement(App, null)
}), /* @__PURE__ */ React.createElement(Route, {
  path: "login",
  element: /* @__PURE__ */ React.createElement(Login, null)
})))), mountNode);
