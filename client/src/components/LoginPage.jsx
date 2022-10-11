import React from "react";
import Logo from "../assets/images/logo.svg";
import {useState} from "react";

export default function LoginPage(props) {

  const [mail, setMail] = useState(null);
  const [password, setPassword] = useState(null);

  async function handleSubmit() {
    const data = {
      email: mail,
      password: password
    }
    fetch('/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((loginResponse) => {
      loginResponse.json().then((loginData) => {
        const loginJson = JSON.parse(loginData);
        if (loginJson.error) {
          window.location = "/login";
        } else {
          // Login was successful!
          window.location = "/home" + (loginJson.homeCart ? ("#" + loginJson.homeCart) : "");
        }
      })
    })
  }

  const handleMailChange = event => {
    setMail(event.target.value);
  };

  const handlePwChange = event => {
    setPassword(event.target.value);
  };


  return (
    
    <div className="Auth-form-container">
      <img src={Logo} alt="Go Grocery" className="logo"/>
      <div className="Auth-form">
        <div className="Auth-form-content">

          <h3 className="Auth-form-title">Log In to Your Account</h3>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="text"
              className="custominput form-control mt-1"
              placeholder="Enter email"
              value={mail}
              onChange={handleMailChange}
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="custominput form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={handlePwChange}
            />
          </div>

          <div className="form-group mt-3">
            <button className="btn btn-primary wideb" onClick={() => handleSubmit()}>
              Log In
            </button>
          </div>

          <p className="text-center mt-2">
            Need an account? <a className="signup" href="/signup">Sign Up</a>
          </p>

        </div>
      </div>
    </div>
  )
}
