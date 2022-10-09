import React from "react";
import Logo from "../assets/images/logo.svg";

export default function SignupPage(props) {
  return (
    
    <div className="Auth-form-container">
      <img src={Logo} alt="Go Grocery" className="logo"/>
      <form className="Auth-form">
        <div className="Auth-form-content">

          <h3 className="Auth-form-title">Create an Account</h3>

          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="custominput form-control mt-1"
              placeholder="Enter a Username*"
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="custominput form-control mt-1"
              placeholder="Enter an Email*"
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="custominput form-control mt-1"
              placeholder="Enter a Password*"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary wideb">
              Create an Account
            </button>
          </div>

          <p className="text-center mt-2">
            Already have an account? <a className="login" href="#">Log In</a>
          </p>

        </div>
      </form>
    </div>
  )
}