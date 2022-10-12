/*import React from "react";
import Login from "./entities/Login"
import Reminders from "./entities/Reminders";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { good: false };
  }

  

render() {
  return (
    <>
      <Reminders/>
    </>
  );  
}
}
export default App;
*/
import React from "react";
import Login from "./entities/Login"
import Home from "./entities/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./entities/CreateAccount";
import VerificationCheck from "./entities/VerificationCheck";
import Reminders from "./entities/Reminders";
import { MainContext } from "./MainContext";

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  state = { 
    profile: null,
    setProfile: this.setProfile
  }

  setProfile = (profile) => {
    this.setProfile({ profile })
  }

  render() {
    return (
      <MainContext.Provider value={this.state}>
        <BrowserRouter>
          <Routes>          
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/home' element={< Home />}></Route>
            <Route exact path='/create' element={< CreateAccount />}></Route>
            <Route exact path='/verification' element={< VerificationCheck />}></Route>
            <Route exact path='/main' element={< Reminders />}></Route>

          </Routes>
        </BrowserRouter>
      </MainContext.Provider>
    )
  }
}

export default App;

