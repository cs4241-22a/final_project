import React from "./_snowpack/pkg/react.js";
import "./global.css.proxy.js";
import {Navigate} from "./_snowpack/pkg/react-router-dom.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggedin: true, currUser: "", arr: []};
    this.loginStatus();
    this.load();
  }
  load() {
    fetch("/collDocs", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: "user"})
    }).then((response) => response.json()).then((json) => {
      this.setState({arr: json});
    });
  }
  loginStatus() {
    fetch("/loginStatus", {
      method: "get",
      "no-cors": true,
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({loggedin: json.login, currUser: json.user});
    });
  }
  render() {
    if (this.state.loggedin == false) {
      return /* @__PURE__ */ React.createElement(Navigate, {
        replace: true,
        to: "/login"
      });
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Hello ", this.state.currUser), /* @__PURE__ */ React.createElement("ul", null, this.state.arr.map((entry) => /* @__PURE__ */ React.createElement("li", null, "hello ", entry.name))));
    }
  }
}
export default App;
