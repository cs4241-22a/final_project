
import React from "react";
import "./global.css";
import { Navigate } from "react-router-dom";

class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { loggedin: true, arr: [] }
    this.loginStatus();
    this.load();
  }

  load() {
    fetch( '/collDocs', { 
      method:'post', 
      'no-cors': true, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"name": "user"}) 
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
      this.setState({ loggedin: json.login }) 
    })
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
            Hello person
        </h1>
        <ul>
          {this.state.arr.map((entry) => <li>hello {entry.name}</li>)}
        </ul>
        </>
      );
    }
  }
}

export default App;
