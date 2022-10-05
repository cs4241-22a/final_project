import React from "react"
import Signin from "./Login"
import { Link } from 'react-router-dom';

export default function (props) {
  return (
    <div className="create-container">
      <form className="create-form">
        <div className="create-content">
          <h3 className="create-title">Create an Account</h3>
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
            Already have an account? <Link to="/signin" element= {<Signin />}>Signin</Link>
          </p>
        </div>
      </form>
    </div>
  )
}