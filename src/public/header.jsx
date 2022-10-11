import React from "react";
import { Button, Container, Form, Navbar, Nav } from "react-bootstrap";

const buttonsRight = (props) => {
    if (props.accountButtons === true) {
        if (props.loggedIn === true) {
            return (
                <Nav className="justify-content-end">
                    <Button href="logout" variant="outline-primary">Log out</Button>
                </Nav>
            )
        }

        else return (
            <Nav className="justify-content-end">
                <Button href="login" variant="outline-primary">Log in</Button>
                <Button href="register" variant="primary">Sign up</Button>
            </Nav>
        )
    }

    
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="light">
            <Container>
                <Navbar.Brand href="/">Recipes</Navbar.Brand>
                { buttonsRight(this.props) }
            </Container>
            </Navbar>
        );
    }
};

export default Header;