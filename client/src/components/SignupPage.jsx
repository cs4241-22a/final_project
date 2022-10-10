import React from "react";
import Logo from "../assets/images/logo.svg";
import { useState } from 'react';

export default function SignupPage(props) {


  //Form Validation
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState(true);
  const [mailError, setMailError] = useState(true);
  const [passwordError, setPwError] = useState(true);

  function isNameValid(username) {
    return /^[a-zA-Z]{5,20}$/.test(username);
  }
  function isEmailValid(email) {
    return /\S+@\S+\.[a-z]{1,3}$/.test(email);
  }
  function checkPasswordLength(password) {
    return /^\S{5,20}$/.test(password);
  }
  function hasPasswordNumber(password) {
    return /[0-9]+/.test(password);
  }
  function hasPasswordSpecialChar(password) {
    return /[^A-Za-z0-9]/.test(password);
  }

  function handleSubmit() {
    if (mailError || passwordError) {
      return;
    }
    const data = {
      email: mail,
      password: password
    }
    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then((response) => {
      response.json().then((d) => {
        const jsonData = JSON.parse(d);
        if (jsonData.error) {
          window.location = "/login";
        } else {
          // User made so we login
          fetch("/login", {
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
                window.location = "/home";
              }
            })
          })
        }
      })
    });
  }

  const handleNameChange = event => {
    if (!isNameValid(event.target.value)) {
      setNameError('Username must be between 5 and 20 letters');
    } else {
      setNameError(null);
    }

    setName(event.target.value);
  };

  const handleMailChange = event => {
    if (!isEmailValid(event.target.value)) {
      setMailError('Please enter a valid email address');
    } else {
      setMailError(null);
    }

    setMail(event.target.value);
  };

  const handlePwChange = event => {
    if (!checkPasswordLength(event.target.value)) {
      setPwError('Password must be between 5 and 20 characters.');
    } else if (!hasPasswordNumber(event.target.value)) {
      setPwError('Password must contain at least one number');
    } else if (!hasPasswordSpecialChar(event.target.value)) {
      setPwError('Password must contain at least one special character');
    }
    else {
      setPwError(null);
    }

    setPassword(event.target.value);
  };


  //signup page
  return (

    <div className="Auth-form-container">
      <img src={Logo} alt="Go Grocery" className="logo" />
      <div className="Auth-form">
        <div className="Auth-form-content">

          <h3 className="Auth-form-title">Create an Account</h3>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="custominput form-control mt-1"
              placeholder="Enter an Email*"
              value={mail}
              onChange={handleMailChange}
            />
            <div className="error" >
              {mailError && <p>{mailError}</p>}
            </div>
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="custominput form-control mt-1"
              placeholder="Enter a Password*"
              value={password}
              onChange={handlePwChange}
            />
            <div className="error" >
              {passwordError && <p>{passwordError}</p>}
            </div>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary wideb"
              disabled={mailError || passwordError}
              onClick={() => {handleSubmit()}}>
              Create an Account
            </button>
          </div>

          <p className="text-center mt-2">
            Already have an account? <a className="login" href="/login">Log In</a>
          </p>

        </div>
      </div>
    </div>
  )
}