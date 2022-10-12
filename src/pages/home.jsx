import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../../public/goat.gif'

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
        padding: '2%',
        backgroundImage: `url(${logo})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <span><h1 style={{backgroundColor: '#AC2B37'}}>Welcome {props.user.name} to GoataShop</h1></span>
      <span><h2 style={{backgroundColor: '#AC2B37'}}>For when you really GoataShop</h2></span>
    </div>
  );
};
  
export default Home;
