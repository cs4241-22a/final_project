import React from "react";
import Login from "./entities/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./entities/CreateAccount";
import VerificationCheck from "./entities/VerificationCheck";
import Reminders from "./entities/Reminders";
import { MainContext } from "./MainContext";

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    fetch('/', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.status)
    })
  }

  setProfile = (profile) => {
    this.setState({ profile })
  }

  state = { 
    profile: null,
    setProfile: this.setProfile
  }

  render() {
    return (
      <MainContext.Provider value={this.state}>
        <BrowserRouter>
          <Routes>          
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/create' element={< CreateAccount />}></Route>
            <Route exact path='/verification' element={< VerificationCheck />}></Route>
            <Route exact path='/' element={< Reminders />}></Route>
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    )
  }
}

export default App;

