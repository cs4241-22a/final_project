import React from "react";
import ReactDOM from "react-dom";
import { Button, Form } from "react-bootstrap";
import Header from './header';

const verifyInfo = function() {  
    const username = document.getElementById("username").value;
    if(username === "") {
        document.getElementById("message").innerHTML = "**Fill the username please!";  
        return false;  
    }

    const pw = document.getElementById("password").value;  
    //check empty password field  
    if(pw === "") {  
       document.getElementById("message").innerHTML = "**Fill the password please!";  
       return false;  
    }  

    const confirmPw = document.getElementById("confirmpassword").value;
    if(pw !== confirmPw) {
        document.getElementById("message").innerHTML = "**Passwords do not match";  
       return false;
    } else {
        // all good, try to make account
        const json = { 
          "username": username, 
          "password": pw
        };
        const data = JSON.stringify(json);
        console.log(data)

        fetch("/register", {
            method: "POST",
            body: data,
            headers: {
            "Content-Type": "application/json"
            }
        }).then (response => {
            if (!response.ok) {
                console.log(response)
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

class Register extends React.Component {
    render() {
        return (
            <div>
                <Header accountButtons={false} />
                <div className="center account-form d-grid gap-2">
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmpassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" />
                    </Form.Group>

                    <Button variant="primary" onClick= { verifyInfo }>
                        Create an account
                    </Button>

                    <p id="message">&nbsp;</p>
                    <p class="center-text">If you have an account, <a href="login">log in</a></p>
                </div>
            </div>
            
        );
    }
}

var mountNode = document.getElementById("page");
ReactDOM.render(<Register />, mountNode);