import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stats">
                <Nav.Link>Stats</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/gamehistory">
                <Nav.Link>Game History</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
