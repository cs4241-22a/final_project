import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <>
      <Navbar bg="white" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              WebChess
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/about">
                <Nav.Link>about</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stats">
                <Nav.Link>stats</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/gamehistory">
                <Nav.Link>game history</Nav.Link>
              </LinkContainer>
                <Nav.Link href="/logout">logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
