import React, { useEffect, useState } from "react";
import { Spinner, Alert, Row, Col } from "react-bootstrap";
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
  //Pagination states & functions
  const [itemsPerPage, setitemsPerPage] = useState<ItemsPerPage>(20);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);

  //Search states
  const [searchQuery, setSearchQuery] = useState<string>(
    JSON.parse(localStorage.getItem("searchQuery")!) || ""
  );

  React.useEffect(() => {
    function updateSearchQuery() {
      window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
    }
    updateSearchQuery();
  }, [searchQuery]);

  //Modal states & function
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  //

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

  //Find total number of pages
  const {
    data: countData,
    error: countError,
    loading: countLoading,
  } = useCountPokemonsQuery();

  let totalNumberOfPokemons = Math.round(
    countData?.pokemon_v2_pokemon_aggregate?.aggregate?.count ??
      1118 / itemsPerPage
  );

  const [numberOfPages, setNumberOfPages] = useState(totalNumberOfPokemons);

  //Pagination functions
  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
      setOffset(page * itemsPerPage - itemsPerPage + 1);
    }
  }

  function nextPage() {
    if (page < numberOfPages) {
      setPage(page + 1);
      setOffset(page * itemsPerPage - itemsPerPage + 1);
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
        setNumberOfPages={setNumberOfPages}
        totalNumberOfPokemons={totalNumberOfPokemons}
        numberOfPages={numberOfPages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <PokemonModal show={show} setShow={setShow} pokemon={selectedPokemon} />
      <Row xs={1} md={5} className="g-4">
        {pokemons?.map((pokemon: any) => (
          <Col key={pokemon.id}>
            <Pokemon
              pokemon={pokemon}
              openModal={handleShow}
              setSelectedPokemon={setSelectedPokemon}
            />
          </Col>
        ))}
      </Row>
      <ListOptions
        setitemsPerPage={setitemsPerPage}
        setOrderBy={setOrderBy}
        previousPage={previousPage}
        nextPage={nextPage}
        page={page}
        setNumberOfPages={setNumberOfPages}
        totalNumberOfPokemons={totalNumberOfPokemons}
        numberOfPages={numberOfPages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default PokemonsContainer;
