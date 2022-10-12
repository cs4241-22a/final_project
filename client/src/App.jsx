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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { good: false };
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>          
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/create' element={< CreateAccount />}></Route>
          <Route exact path='/verification' element={< VerificationCheck />}></Route>

        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;

