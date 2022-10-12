import React from "react";
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
