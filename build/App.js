import React from "./_snowpack/pkg/react.js";
import "./global.css.proxy.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {arr: []};
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
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Hello ", this.props.name), /* @__PURE__ */ React.createElement("ul", null, this.state.arr.map((entry) => /* @__PURE__ */ React.createElement("li", null, "hello ", entry.name))));
  }
}
export default App;
