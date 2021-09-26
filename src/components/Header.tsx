import React, { Dispatch } from "react";
import { Navbar } from "react-bootstrap";
import Search from "../components/Search";

type Props = {
  setSearchQuery: Dispatch<string>;
};

function Header(props: Props) {
  const { setSearchQuery } = props;

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "1rem" }}>
        <Navbar.Brand href="#" style={{ width: "50%" }}>
          POKEMON APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Search setSearchQuery={setSearchQuery} />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
