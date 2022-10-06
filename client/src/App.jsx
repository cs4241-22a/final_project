import React from "react";
import Login from "./entities/Login"
import Reminders from "./entities/Reminders";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { good: false };
  }

  componentDidMount() {
    this.checkAuth()
  }
  
  checkAuth() {
    fetch('/auth/getusername', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ good: response.username !== undefined })
    })
  }

  render() {
    if (this.state.good) {
      return (
        <>
          <Reminders></Reminders>
        </>
      );
    } else {
      return (
        <>
          <Login/>
        </>
      );  
    }
  }
}

export default App;
