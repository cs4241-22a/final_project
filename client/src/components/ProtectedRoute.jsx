import { Navigate } from "react-router-dom";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const loggedInStatus = JSON.parse(sessionStorage.getItem("loggedIn"));

  if (!loggedInStatus) {
    // if user is not authenticated then redirect to login
    console.log("Auth status false, rendering <Login>");
    return <Navigate to="/login" replace={true} />;
  } else {
    // if user is logged in then return the protected component
    console.log("Auth status true, rendering <Home>");
    return children;
  }
};
export default ProtectedRoute;
