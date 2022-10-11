
import React from "react";
import "./global.css";
import { Navigate } from "react-router-dom";

class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { 
      loggedin: true, 
      currUser:"", 
      arr: [],
      displayMakePost: false }
    this.loginStatus();
    this.load();
  }

  load() {
    fetch( '/collDocs', { 
      method:'post', 
      'no-cors': true, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"name": "posts"}) 
    })
    .then( response => response.json() )
    .then( json => {
        this.setState({ arr:json }) 
    })
  }

  loginStatus() {
    fetch('/loginStatus', {
      method: 'get',
      'no-cors': true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      this.setState({ loggedin: json.login, currUser: json.user }) 
    })
  }

  showMakePost() {
    if(this.state.displayMakePost) {
      return (
        <form id="makePost">
          <label for="makePostComment">What would you like to hear?</label>
          <input id="makePostComment" type="text" />
          <button type="submit" /* onclick: send post */>Submit</button>
          <button type="button" onClick={() => this.setState({displayMakePost: false})}>Cancel</button>
        </form>
      );
    }
}
  
  render() {
    if(this.state.loggedin == false) {
      return (
        <Navigate replace to="/login"/>
      );
    } else {
      return (
        <>
        <h1>
            Hello {this.state.currUser}
        </h1>
        <div id="displayPosts">
          <button type="button" onClick={() => this.setState({displayMakePost: true})}>Post</button>
          {this.showMakePost()}
          <ul>
            {this.state.arr.map((entry) => <li>hello {entry.name}</li>)}
          </ul>
        </div>
        </>
      );
    }
  }
}

export default App;
