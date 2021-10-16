import React from "react";
import PokemonsList from "../components/PokemonsList";
import ListOptions from "../components/ListOptions";
import Header from "../components/Header";

function PokemonsContainer() {
  return (
    <>
      <Header />

      <ListOptions />

      <PokemonsList />

      <ListOptions />
    </>
  );
}

export default PokemonsContainer;
