import React from "../_snowpack/pkg/react.js";
import Button from "../_snowpack/pkg/react-bootstrap/Button.js";
import Card from "../_snowpack/pkg/react-bootstrap/Card.js";
import {Container, Row, Col} from "../_snowpack/pkg/react-bootstrap.js";
import Header from "./header.js";
class Table extends React.Component {
  getUser = async () => {
    let the_user = void 0;
    const user = await fetch("/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      the_user = data.result;
    });
    return the_user;
  };
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Row, {
      xs: 1,
      md: 4
    }, this.props.items.map((item, index) => /* @__PURE__ */ React.createElement(Card, {
      style: {width: "18rem", padding: "10px", margin: "15px"}
    }, /* @__PURE__ */ React.createElement(Card.Body, null, /* @__PURE__ */ React.createElement(Card.Title, null, item.title), /* @__PURE__ */ React.createElement(Card.Text, null, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Prep Time: ", item.prepTime, " minutes")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("b", null, "Serves: ", item.numPeople))), /* @__PURE__ */ React.createElement("p", null, item.directions)), /* @__PURE__ */ React.createElement(Button, {
      variant: "primary",
      onClick: () => this.viewOrEdit(item.username, item.title)
    }, "View Full Recipe"))))));
  }
  viewOrEdit = async function(user, title) {
    const sessionuser = await this.getUser();
    const recipeuser = user;
    const params = new URLSearchParams({title});
    if (sessionuser == recipeuser) {
      window.location.replace(window.location.href + "editrecipe?" + params.toString());
    } else {
      window.location.replace(window.location.href + "viewrecipe?" + params.toString());
    }
  };
}
class App extends React.Component {
  getUser = async () => {
    const user = await fetch("/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.state.user = data.result;
    });
    return user;
  };
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: this.getUser()
    };
  }
  componentDidMount() {
    fetch("/recipedata", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((res) => {
      console.log(res);
      this.setState({...this.state, recipes: [...this.state.recipes, ...res]});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement(Header, {
      accountButtons: true,
      loggedIn: this.state.user != false
    }), /* @__PURE__ */ React.createElement("body", {
      id: "basic"
    }, /* @__PURE__ */ React.createElement(Table, {
      items: this.state.recipes
    })));
  }
}
export default App;
