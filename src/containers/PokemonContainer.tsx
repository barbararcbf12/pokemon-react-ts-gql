import React, { useEffect, useState } from "react";
import { Spinner, Alert, Row } from "react-bootstrap";
import { useCountPokemonsQuery, usePokemonsQuery } from "../generated/graphql";
import Pokemon from "../components/Pokemon";
import ListOptions from "../components/ListOptions";
import Header from "../components/Header";
import type {
  PokemonAbilities,
  PokemonType,
  PokemonStat,
} from "../components/PokemonDetails";
import PokemonModal from "../components/PokemonModal";

export type ItemsPerPage = 10 | 20 | 50;

export const spinnerStyle = {
  width: "10rem",
  height: "10rem",
  borderWidth: "1rem",
};

export const spinnerWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
};

export type PokemonSearch = {
  name: string;
  sprites: { front_default: string };
  abilities: Array<PokemonAbilities>;
  stats: Array<PokemonStat>;
  types: Array<PokemonType>;
};

function PokemonsContainer() {
  //Pagination states
  const [itemsPerPage, setitemsPerPage] = useState<ItemsPerPage>(20);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState(0);

  //Search states
  const [searchQuery, setSearchQuery] = useState<any>("");

  //Modal states
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  //State to change order_by criteria
  const [orderBy, setOrderBy] = useState<any>({ name: "asc" });

  const options = {
    variables: {
      limit: itemsPerPage,
      offset,
      orderBy,
      where: searchQuery,
    },
  };

  //Fetch pokemons from Graphql api
  const { data, error, loading } = usePokemonsQuery(options);

  const [pokemons, setPokemons] = useState<any>();

  useEffect(() => {
    if (data?.pokemon_v2_pokemon && data?.pokemon_v2_pokemon?.length > 0) {
      setPokemons(data?.pokemon_v2_pokemon);
    }
  }, [data?.pokemon_v2_pokemon]);

  const {
    data: countData,
    error: countError,
    loading: countLoading,
  } = useCountPokemonsQuery();

  //Pagination functions
  let numberOfPages =
    countData?.pokemon_v2_pokemon_aggregate?.aggregate?.count ?? 100;

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
      setOffset(page * itemsPerPage);
    }
  }

  function nextPage() {
    if (page < numberOfPages) {
      setPage(page + 1);
      setOffset(page * itemsPerPage);
    }
  }
  //

  const [selectedPokemon, setSelectedPokemon] = useState();

  //Rendering depending on responses
  if (loading || countLoading) {
    return (
      <div style={spinnerWrapperStyle}>
        <Spinner style={spinnerStyle} animation="border" />
      </div>
    );
  }

  if (error || !data || countError || !countData) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <ListOptions
        setitemsPerPage={setitemsPerPage}
        setOrderBy={setOrderBy}
        previousPage={previousPage}
        nextPage={nextPage}
        page={page}
        numberOfPages={numberOfPages}
      />

      <Row xs={1} md={5} className="g-4">
        <PokemonModal show={show} setShow={setShow} pokemon={selectedPokemon} />
        {pokemons?.map((pokemon: any) => (
          <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            openModal={handleShow}
            setSelectedPokemon={setSelectedPokemon}
          />
        ))}
      </Row>
    </>
  );
}

export default PokemonsContainer;
