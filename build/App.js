import React from "./_snowpack/pkg/react.js";
import "./global.css.proxy.js";
import {Navigate} from "./_snowpack/pkg/react-router-dom.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: true,
      currUser: "",
      posts: [],
      displayMakePost: false,
      displayMakeResponse: [],
      displayViewResponses: []
    };
    this.loginStatus();
    this.load();
  }
  load() {
    fetch("/collDocs", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name: "posts"})
    }).then((response) => response.json()).then((json) => {
      console.log(json);
      this.setState({posts: json});
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
  makePost(e) {
    e.preventDefault();
    fetch("/addPost", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user: this.state.currUser, comment: document.getElementById("makePostComment").value, responses: []})
    });
    this.setState({displayMakePost: false});
    this.load();
  }
  showMakePost() {
    if (this.state.displayMakePost) {
      return /* @__PURE__ */ React.createElement("form", {
        id: "makePost"
      }, /* @__PURE__ */ React.createElement("label", {
        for: "makePostComment"
      }, "What would you like to hear?"), /* @__PURE__ */ React.createElement("input", {
        id: "makePostComment",
        type: "text"
      }), /* @__PURE__ */ React.createElement("button", {
        type: "submit",
        onClick: (e) => this.makePost(e)
      }, "Submit"), /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: () => this.setState({displayMakePost: false})
      }, "Cancel"));
    }
  }
  displayPost(post, i) {
    return /* @__PURE__ */ React.createElement("li", null, "Comment: ", post.comment, /* @__PURE__ */ React.createElement("button", {
      type: "button",
      onClick: () => {
        let arr = this.state.displayMakeResponse;
        arr[i] = true;
        this.setState({displayMakeResponse: arr});
      }
    }, "Respond"), /* @__PURE__ */ React.createElement("input", {
      type: "button",
      value: this.state.displayViewResponses[i] === true ? "Hide Responses" : "View Responses",
      onClick: (e) => {
        let arr = this.state.displayViewResponses;
        if (arr[i] === true) {
          arr[i] = false;
          this.setState({displayViewResponses: arr});
        } else {
          arr[i] = true;
          this.setState({displayViewResponses: arr});
        }
      }
    }), this.showViewResponses(i), this.showMakeResponse(i));
  }
  makeResponse(e, i) {
    e.preventDefault();
    fetch("/addResp", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user: this.state.currUser,
        song: document.getElementById("makeResponseSong").value,
        artist: document.getElementById("makeResponseArtist").value,
        comment: document.getElementById("makeResponseComment").value
      })
    }).then((response) => response.json()).then((json) => {
      fetch("/updatePostNewResponse", {
        method: "post",
        "no-cors": true,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({_id: this.state.posts[i]._id, responseid: json.insertedId})
      });
    });
    let arr = this.state.displayMakeResponse;
    arr[i] = false;
    this.setState({displayMakeResponse: arr});
    this.load();
  }
  showMakeResponse(i) {
    if (this.state.displayMakeResponse[i]) {
      return /* @__PURE__ */ React.createElement("form", {
        id: "makeResponse"
      }, /* @__PURE__ */ React.createElement("label", {
        for: "makeResponseSong"
      }, "Song: "), /* @__PURE__ */ React.createElement("input", {
        id: "makeResponseSong",
        type: "text"
      }), /* @__PURE__ */ React.createElement("label", {
        for: "makeResponseArtist"
      }, "Artist: "), /* @__PURE__ */ React.createElement("input", {
        id: "makeResponseArtist",
        type: "text"
      }), /* @__PURE__ */ React.createElement("label", {
        for: "makeResponseComment"
      }, "Comment: "), /* @__PURE__ */ React.createElement("input", {
        id: "makeResponseComment",
        type: "text"
      }), /* @__PURE__ */ React.createElement("button", {
        type: "submit",
        onClick: (e) => this.makeResponse(e, i)
      }, "Submit"), /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: () => {
          let arr = this.state.displayMakeResponse;
          arr[i] = false;
          this.setState({displayMakeResponse: arr});
        }
      }, "Cancel"));
    }
  }
  showViewResponses(i) {
    if (this.state.displayViewResponses[i]) {
      return /* @__PURE__ */ React.createElement("ul", null, this.state.posts[i].responses.map((entry) => {
        if (entry !== null && Object.keys(entry).length !== 0)
          return /* @__PURE__ */ React.createElement("li", null, entry);
      }));
    }
  }
  render() {
    if (this.state.loggedin == false) {
      return /* @__PURE__ */ React.createElement(Navigate, {
        replace: true,
        to: "/login"
      });
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Hello ", this.state.currUser), /* @__PURE__ */ React.createElement("div", {
        id: "displayPosts"
      }, /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: () => this.setState({displayMakePost: true})
      }, "Make Post"), this.showMakePost(), /* @__PURE__ */ React.createElement("ul", null, this.state.posts.map((post, i) => this.displayPost(post, i)))));
    }
  }
}
export default App;
