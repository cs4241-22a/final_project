import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function logIn(e) {
        e.preventDefault();
        fetch('/loggingIn', {
            method: 'post',
            'no-cors': true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user, pass: pass})
        });
        navigate("/");
    }

    return (
    <form>
        <h2>Log in</h2>
        <label for="user">Username:</label>
        <input type="text" id="user" name="user" onChange={e => setUser(e.target.value)}/>
        <label for="pass">Password: </label>
        <input type="password" id="pass" name="pass" onChange={e => setPass(e.target.value)}/>
        <input type="submit" value="log in" onClick={e => logIn(e)}
        />
    </form>
    );
}

export default Login;