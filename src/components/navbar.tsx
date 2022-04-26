import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";


const NavbarComponent = () => {
  const token = localStorage.getItem("email");

  const logout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">
          <img
            src="https://bitcoin.org/img/icons/opengraph.png?1648897668"
            width={50}
            alt=""
          />{" "}
          Crypto Portfolio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/currencies">Currencies</Nav.Link>
            {token && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}{" "}
            {!token && <Nav.Link href="/login">Login</Nav.Link>}{" "}
            {token && <Nav.Link onClick={logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
