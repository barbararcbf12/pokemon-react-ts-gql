import React, { useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { useCountPokemonsQuery, usePokemonsQuery } from "../generated/graphql";
import { fetchPokemon } from "../utils/getPokemon";
import Pokemon from "../components/Pokemon";
import Search from "../components/Search";
import type {
  PokemonAbilities,
  PokemonType,
  PokemonStat,
} from "../components/PokemonDetails";
import PokemonModal from "../components/PokemonModal";

type ItemsPerPage = 10 | 20 | 50;

export const spinnerStyle = {
  width: "10rem",
  height: "10rem",
  borderWidth: "1rem",
};

export const spinnerWrapperStyle = {
  //textAlign: "center",
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
  const [itemsPerPage, setitemsPerPage] = useState<ItemsPerPage>(20);
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState(0);

  //Modal states
  const [pokemonSearch, setPokemonSearch] = useState<PokemonSearch>();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState(false);

  function handleShow() {
    //setFullscreen(true);
    setShow(true);
  }

  //Fetch pokemons from Graphql api
  const { data, error, loading } = usePokemonsQuery({
    variables: {
      limit: itemsPerPage,
      offset: offset,
    },
  });

  const pokemons = data?.pokemon_v2_pokemon;

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

  //Search function
  const getPokemon = async (query: any) => {
    if (!query) {
      setErrorMsg("You must enter a Pokemon");
      setErrorSearch(true);
      return;
    }
    setErrorSearch(false);
    setLoadingSearch(true);
    setTimeout(async () => {
      try {
        const response = await fetchPokemon(query);
        const results = await response.json();
        setPokemonSearch(results);
        setLoadingSearch(false);
      } catch (err) {
        console.log(err);
        setLoadingSearch(false);
        setErrorSearch(true);
        setErrorMsg("Pokemon not found.");
      }
    }, 1500);
  };

  //Rendering dependingo on responses
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
      <Search getPokemon={getPokemon} openModal={handleShow} />
      <PokemonModal
        show={show}
        setShow={setShow}
        pokemon={pokemonSearch}
        error={errorSearch}
        errorMsg={errorMsg}
        loading={loadingSearch}
      />
      <nav>
        <div>
          Items per page:{" "}
          <button onClick={() => setitemsPerPage(10)}>10</button> | 
          <button onClick={() => setitemsPerPage(20)}>20</button> |{" "}
          <button onClick={() => setitemsPerPage(50)}>50</button>
        </div>
        <div>
          <span>
            Page: {page} of {numberOfPages}
          </span>{" "}
          <button onClick={() => previousPage()}>Previous</button>{" "}
          <button onClick={() => nextPage()}>Next</button>
        </div>
      </nav>
      <div className="container">
        {pokemons?.map((pokemon: any) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

export default PokemonsContainer;
