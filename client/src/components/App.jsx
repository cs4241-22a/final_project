import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  useEffect(() => {
    console.log("In use effect of <App/>");
    const url = window.location.href;
    const hasCode = url.includes("?code="); // github cb success
    if (hasCode) {
      sessionStorage.setItem("loggedIn", "true");
      window.open("https://quick-notes.glitch.me/", "_self");
    }
  }, []);

  console.log("In <App/>");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          exact
          element={<ProtectedRoute>{<Home />}</ProtectedRoute>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
