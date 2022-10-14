import React from "../_snowpack/pkg/react.js";
import Button from "../_snowpack/pkg/react-bootstrap/Button.js";
import Card from "../_snowpack/pkg/react-bootstrap/Card.js";
import {Container, Row, Col} from "../_snowpack/pkg/react-bootstrap.js";
import Header from "./header.js";
import SearchAndSort from "./searchAndSort.js";
import Table from "./table.js";
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
  sortRecipes(recipes) {
    var sort = (new URL(location.href).searchParams.get("sort") || "").toLowerCase();
    switch (sort) {
      case "recent":
        return recipes;
      case "preptime":
        return recipes.sort((recipe1, recipe2) => +recipe1.prepTime - +recipe2.prepTime);
      case "servings":
        return recipes.sort((recipe1, recipe2) => +recipe1.numPeople - +recipe2.numPeople);
      case "alphabetical":
        return recipes.sort((recipe1, recipe2) => recipe1.title.localeCompare(recipe2.title));
      default:
        return recipes;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: this.getUser()
    };
  }
  componentDidMount() {
    fetch("/recipedata?" + new URLSearchParams({
      search: new URL(location.href).searchParams.get("search")
    }), {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((res) => {
      this.setState({...this.state, recipes: this.sortRecipes([...this.state.recipes, ...res])});
    });
  }
  render() {
    return /* @__PURE__ */ React.createElement("div", {
      className: "App"
    }, /* @__PURE__ */ React.createElement(Header, {
      accountButtons: true,
      loggedIn: this.state.user != false
    }), /* @__PURE__ */ React.createElement(SearchAndSort, null), /* @__PURE__ */ React.createElement("body", {
      id: "basic"
    }, /* @__PURE__ */ React.createElement(Table, {
      items: this.state.recipes
    })));
  }
}
export default App;
