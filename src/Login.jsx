import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    function logIn(e) {
        e.preventDefault();
        fetch('/loggingIn', {
            method: 'post',
            'no-cors': true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user, pass: pass})
        })
        .then(response => response.json())
        .then(json => {
            if(!json.login) {
                setLoginStatus("Failed to log in");
                document.getElementById('pass').value = "";
            } else {
                navigate("/");
            }
        });
    }

    function register(e) {
        e.preventDefault();
        fetch('/register', {
            method: 'post',
            'no-cors': true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user, pass: pass, responses: []})
        })
        .then(response => response.json())
        .then(json => {
            console.log(json.result)
            if(json.result !== "") {
                setLoginStatus(json.result);
            } else {
                navigate("/");
            }
        });
    }

    return (
    <form id="loginForm">
        <h2 class="loginText">Log in</h2>
        <label id="loginFields" for="user">Username:</label>
        <input type="text" id="user" name="user" onChange={e => setUser(e.target.value)}/>
        <label id="loginFields2" for="pass">Password: </label>
        <input type="password" id="pass" name="pass" onChange={e => setPass(e.target.value)}/>
        <input id="loginButtons" type="submit" value="log in" onClick={e => logIn(e)}/>
        <input id="loginButtons2" type="submit" value="register" onClick={e => register(e)}/>
        <p>{loginStatus}</p>
    </form>
    );
}

export default Login;