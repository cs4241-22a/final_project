import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">Recipes</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Nav.Link href="register" >Register</Nav.Link>
                    </Nav>

                </Container>
            </Navbar>
        );
    }
};

export default Header;