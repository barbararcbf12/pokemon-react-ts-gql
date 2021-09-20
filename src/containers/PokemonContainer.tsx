import React from "react";
import { usePokemonsQuery } from "../generated/graphql";
import Pokemon from "../components/Pokemon";

function PokemonsContainer() {
  const { data, error, loading } = usePokemonsQuery();
  const pokemons = data?.pokemon_v2_pokemon;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return <Pokemon pokemons={pokemons} />;
}

export default PokemonsContainer;
