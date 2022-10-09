import React from "react";
import Logo from "../assets/images/logo.svg";

export default function LoginPage(props) {
  return (
    
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">

          <h3 className="Auth-form-title">Log In to Your Group</h3>

          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="custominput form-control mt-1"
              placeholder="Enter username"
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="custominput form-control mt-1"
              placeholder="Enter password"
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>

          <p className="text-center mt-2">
            Need an account? <a className="signup" href="#">Sign Up</a>
          </p>

        </div>
      </form>
    </div>
  )
}
