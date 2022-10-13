import React from "./_snowpack/pkg/react.js";
import "./blk-design-system-react.css.proxy.js";
import {Navigate} from "./_snowpack/pkg/react-router-dom.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: true,
      currUser: "",
      userRespNum: -1,
      posts: [],
      displayMakePost: false,
      displayMakeResponse: [],
      displayViewResponses: [],
      tempRespData: []
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
  numResponses(username) {
    fetch("/userInfo", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user: username})
    }).then((response) => response.json()).then((json) => {
      if (json[0] !== void 0) {
        this.setState({userRespNum: json[0].responses.length});
      }
    });
  }
  loginStatus() {
    fetch("/loginStatus", {
      method: "get",
      "no-cors": true,
      headers: {"Content-Type": "application/json"}
    }).then((response) => response.json()).then((json) => {
      this.setState({loggedin: json.login, currUser: json.user});
      this.numResponses(json.user);
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
      id: "viewrespbtn",
      type: "button",
      value: this.state.displayViewResponses[i] === true ? "Hide Responses" : "View Responses",
      onClick: (e) => {
        this.load();
        let arr = this.state.displayViewResponses;
        if (arr[i] === true) {
          arr[i] = false;
          this.setState({displayViewResponses: arr});
        } else {
          arr[i] = true;
          this.setState({displayViewResponses: arr});
        }
        if (this.state.posts[i].responses !== void 0) {
          let repdataArr = this.state.tempRespData;
          repdataArr[i] = [];
          this.setState({tempRespData: repdataArr});
          for (let j = 0; j < this.state.posts[i].responses.length; j++) {
            fetch("/collDoc", {
              method: "post",
              "no-cors": true,
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({collName: "responses", _id: this.state.posts[i].responses[j]})
            }).then((result) => result.json()).then((json) => {
              let dataArr = this.state.tempRespData;
              dataArr[i].push(json[0]);
              this.setState({tempRespData: dataArr});
            });
          }
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
    if (this.state.displayViewResponses[i] && this.state.tempRespData[i] !== void 0 && this.state.tempRespData[i].length > 0) {
      const jsx = /* @__PURE__ */ React.createElement("ul", null, this.state.tempRespData[i].map((entry, j) => {
        if (entry !== null && Object.keys(entry).length !== 0) {
          console.log(this.state.tempRespData);
          return this.showResponseData(i, j);
        }
      }));
      return jsx;
    }
  }
  showResponseData(i, j) {
    return /* @__PURE__ */ React.createElement("li", null, "Song: ", this.state.tempRespData[i][j].song, "Artist: ", this.state.tempRespData[i][j].artist, "Comment: ", this.state.tempRespData[i][j].comment);
  }
  render() {
    if (this.state.loggedin == false) {
      return /* @__PURE__ */ React.createElement(Navigate, {
        replace: true,
        to: "/login"
      });
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Hello ", this.state.currUser, " Responses Made: ", this.state.userRespNum), /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: () => window.location.reload()
      }, "Refresh"), /* @__PURE__ */ React.createElement("div", {
        id: "displayPosts"
      }, /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: () => this.setState({displayMakePost: true})
      }, "Make Post"), this.showMakePost(), /* @__PURE__ */ React.createElement("ul", null, this.state.posts.map((post, i) => this.displayPost(post, i)))));
    }
  }
}
export default App;
