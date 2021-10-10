import React from "react";
import { Navbar } from "react-bootstrap";
import Search from "../components/Search";

const ObjectStyles = {
  navBar: { paddingBottom: "1rem" },
  navBarBrand: { width: "30%" },
  col: { paddingRight: 5 },
};

function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" style={ObjectStyles.navBar}>
        <Navbar.Brand href="#" style={ObjectStyles.navBarBrand}>
          POKEMON APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Search />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
