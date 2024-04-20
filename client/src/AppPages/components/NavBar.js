// Navbar.js
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ChartWithNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ConserveAI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto justify-content-end">
            <Nav.Link href="home">Home</Nav.Link>
            <span className="nav-separator">|</span>
            <Nav.Link href="product">Our Product</Nav.Link>
            <span className="nav-separator">|</span> {/* Separator */}
            <Nav.Link href="login">
              <FontAwesomeIcon icon={faUser} /> Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ChartWithNavbar;