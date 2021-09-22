import React, { Dispatch, SetStateAction } from "react";
import { Navbar } from "react-bootstrap";
import Search from "../components/Search";
import { ItemsPerPage } from "../containers/PokemonContainer";

type Props = {
  getPokemon: (query: any) => Promise<void>;
  openModal: () => void;
};

function Header(props: Props) {
  const { getPokemon, openModal } = props;

  return (
    <>
      <Navbar bg="light" expand="lg" style={{ paddingBottom: "1rem" }}>
        <Navbar.Brand href="#">POKEMON APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Search getPokemon={getPokemon} openModal={openModal} />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
