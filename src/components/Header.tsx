import React, { Dispatch } from "react";
import { Navbar } from "react-bootstrap";
import Search from "../components/Search";

type Props = {
  setSearchQuery: Dispatch<string>;
  setSearchCriteria: Dispatch<string>;
  searchCriteria: string;
  setOffset: Dispatch<number>;
  setPage: Dispatch<number>;
};

function Header(props: Props) {
  const {
    setSearchQuery,
    searchCriteria,
    setSearchCriteria,
    setOffset,
    setPage,
  } = props;

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "1rem" }}>
        <Navbar.Brand href="#" style={{ width: "30%" }}>
          POKEMON APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Search
            setSearchQuery={setSearchQuery}
            setSearchCriteria={setSearchCriteria}
            searchCriteria={searchCriteria}
            setOffset={setOffset}
            setPage={setPage}
          />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
