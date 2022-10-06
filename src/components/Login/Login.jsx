import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Create from "./Create"

export default function (props) {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="login-content">
          <h3 className="login-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="no-account text-right mt-2">
            Don't have an account? <Link to="/create-an-account" element= {<Create />}>Create one</Link>
          </p>
        </div>
      </form>
    </div>
  )
}