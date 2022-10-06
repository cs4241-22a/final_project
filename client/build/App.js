import React from "./_snowpack/pkg/react.js";
import Login from "./entities/Login.js";
import Reminders from "./entities/Reminders.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {good: false};
  }
  componentDidMount() {
    this.checkAuth();
  }
  checkAuth() {
    fetch("/auth/getusername", {
      method: "GET"
    }).then((response) => response.json()).then((response) => {
      this.setState({good: response.username !== void 0});
    });
  }
  render() {
    if (this.state.good) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Reminders, null));
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Login, null));
    }
  }
}
export default App;
