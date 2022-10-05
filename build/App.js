import React from "./_snowpack/pkg/react.js";
class App extends React.Component {
  render() {
    const {name} = this.props;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Hello ", name));
  }
}
export default App;
