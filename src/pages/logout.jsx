import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
      fetch("/logout", {
        method: "POST",
      }).then(async (response) => {
      let res = await response.json()
      navigate('/login')
    }).then(navigate('/login')).then(location.reload())
    
    
    
  }, []);
  return (
    <div
      style={{
        display: 'block',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        padding: '2%'
      }}
    >
      <h1>You Have Been Logged Out</h1>
    </div>
  );
};
  
export default Logout;
