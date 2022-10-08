import React from "../_snowpack/pkg/react.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.load();
  }
  load() {
    fetch("/recipedata", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({recipes: json});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Homepage"));
  }
}
export default App;
