import React from "react";
import ReactDOM from "react-dom";
import { Button, Form } from "react-bootstrap";
import Header from './header';

const attemptLogin = function () {
    const username = document.getElementById("username").value;
    if (username === "") {
        document.getElementById("message").innerHTML = "**Fill the username please!";
        return false;
    }

    const pw = document.getElementById("password").value;
    //check empty password field
    if (pw === "") {
        document.getElementById("message").innerHTML = "**Fill the password please!";
        return false;
    } else {
        // all good, try to log in
        const json = {
            "username": username,
            "password": pw
        };
        const data = JSON.stringify(json);

        fetch("/login", {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            else if (!response.redirected) {
                return response.json();
            }
            else {
                window.location.replace(response.url);
                return false;
            }
        }).then(data => {
            if (data != false) {
                document.getElementById("message").innerHTML = data;
            }
            return false;
        });
    }
}

class Login extends React.Component {
    render() {
        return (
            <div>
                <Header accountButtons={false} />
                <div className="center account-form d-grid gap-2">
                    <h1 class="mb-3">Log in</h1>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" autoComplete="off" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" autoComplete="off" />
                    </Form.Group>

                    <Button variant="primary" onClick={attemptLogin}>
                        Log In
                    </Button>

                    <p id="message">&nbsp;</p>
                    <p class="center-text">Not a member? <a href="register">Sign up</a></p>
                </div>
            </div>
        );
    }
}

var mountNode = document.getElementById("page");
ReactDOM.render(<Login />, mountNode);