import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const ChartWithNavbar = () => {
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Metratrics</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="markets">Markets</Nav.Link>
            <Nav.Link href="#">News</Nav.Link>
            <Nav.Link href="#">Portfolio</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="d-flex justify-content-between align-items-center chart-container">
        <div>
    
        </div>
      </div>
    </div>
  );
};

export default ChartWithNavbar;
