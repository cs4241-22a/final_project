
import React from "react";
import "./global.css";

class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { arr:[] }
    this.load()
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
  
  render() {
    return (
      <>
      <h1>
          Hello {this.props.name}
      </h1>
      <ul>
        {this.state.arr.map((entry) => <li>hello {entry.name}</li>)}
      </ul>
      </>
    );
  }
}

export default App;
