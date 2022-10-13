import React from "react";
import { Button, Container, Navbar, Nav } from "react-bootstrap";

const buttonsRight = (props) => {
    if (props.accountButtons === true) {
        if (props.loggedIn === true) {
            return (
                <Nav className="justify-content-end">
                    <Button href="addrecipe" className="me-1" variant="outline-primary">Add Your Own Recipe</Button>
                    <Button href="logout" variant="outline-light">Log out</Button>
                </Nav>
            )
        }

        else return (
            <Nav className="justify-content-end">
                <Button href="login" className="me-1" variant="outline-light">Log in</Button>
                <Button href="register" variant="outline-primary">Sign up</Button>
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
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Recipes</Navbar.Brand>
                { buttonsRight(this.props) }
            </Container>
            </Navbar>
        );
    }
};

export default Header;