<<<<<<< HEAD
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

=======
import React from "react";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";
  
>>>>>>> 0d66e3d2c7bd96a07408e9f9644452cd77dc5b58
class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light">
<<<<<<< HEAD
                <Container>
                    <Navbar.Brand href="/">Recipes</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav.Link href="register" >Register</Nav.Link>
                    </Nav>

                </Container>
=======
            <Container>
                <Navbar.Brand href="/">Recipes</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Button href="login" variant="outline-primary">Log in</Button>
                    <Button href="register" variant="primary">Sign up</Button>
                </Nav>
                
            </Container>
>>>>>>> 0d66e3d2c7bd96a07408e9f9644452cd77dc5b58
            </Navbar>
        );
    }
};

export default Header;