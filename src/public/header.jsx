import React from "react";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";
  
class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">Recipes</Navbar.Brand>
                <Nav className="justify-content-end">
                    <Button href="login" variant="outline-primary">Log in</Button>
                    <Button href="register" variant="primary">Sign up</Button>
                </Nav>
                
            </Container>
            </Navbar>
          );
    }
};
  
export default Header;