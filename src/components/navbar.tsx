import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../user-context";

const NavbarComponent = () => {
  const userCtx = useContext(UserContext);
  console.log(userCtx.user);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Currencies</Nav.Link>
            {userCtx.user && <Nav.Link href="#home">Dashboard</Nav.Link>}{" "}
            {!userCtx.user && <Nav.Link href="#home">Login</Nav.Link>}{" "}
            {userCtx.user && <Nav.Link href="#home">Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
