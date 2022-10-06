import React from "../_snowpack/pkg/react.js";
import {Button, Box, AppBar, Typography, Toolbar} from "../_snowpack/pkg/@mui/material.js";
class Login extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
      style: {paddingBottom: 50}
    }, /* @__PURE__ */ React.createElement(AppBar, {
      position: "static"
    }, /* @__PURE__ */ React.createElement(Toolbar, {
      variant: "dense"
    }, /* @__PURE__ */ React.createElement(Typography, {
      variant: "h6",
      color: "inherit",
      component: "div"
    }, "Reminders")))), /* @__PURE__ */ React.createElement(Button, {
      variant: "contained",
      href: "/auth/github"
    }, "Sign in with GitHub"));
  }
}
export default Login;
