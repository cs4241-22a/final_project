import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.getUser()
    if (!props.user.name) {
      navigate('/login');
    }
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
      <h1>Welcome to GoataShop</h1>
      <h2>For when you really GoataShop</h2>
      <p>{props.user.name}</p>
    </div>
  );
};
  
export default Home;
