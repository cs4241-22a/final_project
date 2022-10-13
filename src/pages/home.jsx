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
      <div style={{backgroundColor: 'white', borderRadius: '1rem', maxWidth: 'fit-content', maxHeight: 'fit-content', padding: '2rem'}}>
        <h1 style={{color: '#ad2b37', padding: '1rem', fontWeight: 'bold'}}>Welcome {props.user.name} to GoataShop</h1>
        <h2 style={{padding: '1rem'}}>For when you really GoataShop</h2>
      </div>
    </div>
  );
};
  
export default Home;
