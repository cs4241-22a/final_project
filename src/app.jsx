import React from "react";
import {Link} from "react-router-dom"


// Import the Login page component
import Login from "./pages/login.jsx";
import CreateEvent from "./pages/createEvent.jsx";
import DisplayEvent from "./pages/displayEvent.jsx";
import Account from "./pages/account.jsx";

// Import and apply CSS stylesheet
import "./styles/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
     <Login />
    </>
  );
}
