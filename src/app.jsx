import React from "react";
import PageRouter from "./components/router.jsx";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Import the Login page component
import Login from "./pages/login.jsx";
import CreateEvent from "./pages/createEvent.jsx";
import DisplayEvent from "./pages/displayEvent.jsx";
import Account from "./pages/account.jsx";

// Import and apply CSS stylesheet
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const logoutSubmit = (logoutEvent) => {
    logoutEvent.preventDefault();
    fetch("/logout", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        window.location.href = "/";
      });
  };

  const createEventSubmit = (createEvent) => {
    createEvent.preventDefault();
    window.location.href = "/event/new";
  };

  const homeSubmit = (homeEvent) => {
    fetch("/userLoggedIn", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      "no-cors": true,
    })
      .then((response) => response.json())
      .then((json) => (window.location.href = "/user/" + json.username));
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>When3Meet</Navbar.Brand>
        <Nav>
          <Nav.Link href="" onClick={homeSubmit}>
            Account
          </Nav.Link>
          <Nav.Link href="" onClick={createEventSubmit}>
            New Event
          </Nav.Link>
          <Nav.Link href="" onClick={logoutSubmit}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <PageRouter />
    </>
  );
}
