import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    props.getUser()
    if (props.user.name) {
      navigate('/home');
    }
  }, [props.user]);
  return (
    <div id="login">
      <a href="/auth/outlook">Login with Outlook</a>
    </div>
  );
};
  
export default Login;
