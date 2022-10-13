import React, {useEffect, useState} from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import gompei from '../../public/gompei.png';
import { Button } from 'semantic-ui-react'

const Login = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.getUser()
    props.funcNav(false);
    if (props.user.name) {
      navigate('/home');
    }
  }, [props.user]);
  return (
    <Container id="login" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{margin: '1rem', fontWeight: 'bold'}}>Welcome to GoataShop!</h1>
        <img src={gompei} alt="BigCo Inc. logo"/>
        <a href="/auth/outlook">
          <Button style={{width: '15rem', height: '5rem', borderRadius: '1rem', backgroundColor: '#ac2b37', color: 'white', margin: '1rem', border: '0'}}>
              <p style={{margin: '0'}}>Log in with Outlook</p>
          </Button>
      </a>    
 </Container>
  );
};
  
export default Login;
