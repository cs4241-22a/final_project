'use strict';


const e = React.createElement;
const login_form = <form className="form1" action="/login" method="POST">
<input
  className="un "
  type="text"
  align="center"
  placeholder="Username"
  name="username"
/>
<input
  className="pass"
  type="password"
  align="center"
  placeholder="Password"
  name="password"
/>
<button type="submit" className="submit" align="center">Submit</button>
</form>;



class LoggedIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {submitted: false}
  }

  render() {
    if(this.state.submitted){
     return login_form
    }
    

    return e(
      'text',
      {onClick: () => this.setState({submitted: true})},
      <button type="submit" className="special_submit" align="center">Click here to enter information...</button>,
    );
  }
}


const domContainer = document.getElementById('login_form');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LoggedIn));