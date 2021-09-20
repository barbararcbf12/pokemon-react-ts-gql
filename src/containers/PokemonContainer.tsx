import React, { useState } from "react";
import { usePokemonsQuery } from "../generated/graphql";
import Pokemon from "../components/Pokemon";

type ItemsPerPage = 10 | 20 | 50;

function PokemonsContainer() {
  const [itemsPerPage, setitemsPerPage] = useState<ItemsPerPage>(20);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState(page * itemsPerPage);
  const { data, error, loading } = usePokemonsQuery({
    variables: {
      limit: itemsPerPage,
      offset: offset,
    },
  });
  const pokemons = data?.pokemon_v2_pokemon;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  return (
    <div className="container">
      {pokemons?.map((pokemon) => (
        <Pokemon key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonsContainer;
