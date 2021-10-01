import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useCountPokemonsQuery, usePokemonsQuery } from "../generated/graphql";
import PokemonsList from "../components/PokemonsList";
import ListOptions from "../components/ListOptions";
import Header from "../components/Header";
import type {
  PokemonAbilities,
  PokemonType,
  PokemonStat,
} from "../components/PokemonDetails";

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

const ObjectStyles = {
  containerCol: {
    display: "flex",
  },
  noResults: { minHeight: "20vh", display: "flex", alignItems: "center" },
};

function PokemonsContainer() {
  const [selectedOrderBy, setSelectedOrderBy] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("selectedOrderBy")!) || ["active", "", ""]
  );

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(
    JSON.parse(localStorage.getItem("selectedItemsPerPage")!) || [
      "",
      "active",
      "",
    ]
  );

  //Pagination states & functions
  const [itemsPerPage, setitemsPerPage] = useState<ItemsPerPage>(
    JSON.parse(localStorage.getItem("itemsPerPage")!) || 20
  );
  const [page, setPage] = useState<number>(
    JSON.parse(localStorage.getItem("page")!) || 1
  );
  const [offset, setOffset] = useState<number>(
    JSON.parse(localStorage.getItem("offset")!) || 0
  );

  //State to change order_by criteria
  const [orderBy, setOrderBy] = useState<any>(
    JSON.parse(localStorage.getItem("orderBy")!) || { name: "asc" }
  );

  React.useEffect(() => {
    function keepChoiceItemsPerPage() {
      window.localStorage.setItem("itemsPerPage", JSON.stringify(itemsPerPage));
    }
    function keepChoiceOrderBy() {
      window.localStorage.setItem("orderBy", JSON.stringify(orderBy));
    }
    function keepChoicePage() {
      window.localStorage.setItem("page", JSON.stringify(page));
    }
    function keepChoiceOffset() {
      window.localStorage.setItem("offset", JSON.stringify(offset));
    }
    keepChoiceItemsPerPage();
    keepChoiceOrderBy();
    keepChoicePage();
    keepChoiceOffset();
  }, [itemsPerPage, offset, orderBy, page]);

  //Search states
  const [searchQuery, setSearchQuery] = useState<string>(
    JSON.parse(localStorage.getItem("searchQuery")!) || ""
  );
  const [searchCriteria, setSearchCriteria] = useState("name");

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

  //Fetch pokemons from Graphql api
  const options = {
    variables: {
      limit: itemsPerPage,
      offset,
      orderBy,
      pokemonName: searchCriteria === "name" ? searchQuery : "",
      pokemonAbility: searchCriteria === "name" ? "" : searchQuery,
    },
  };

  const { data, error, loading } = usePokemonsQuery(options);

  const [pokemons, setPokemons] = useState<any>([]);

  //Fetch NEXT PAGE from Graphql api
  const nextPageOptions = {
    variables: {
      limit: itemsPerPage,
      offset: offset + itemsPerPage,
      orderBy,
      pokemonName: searchCriteria === "name" ? searchQuery : "",
      pokemonAbility: searchCriteria === "name" ? "" : searchQuery,
    },
  };
  const { data: dataNextPage } = usePokemonsQuery(nextPageOptions);

  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    setPokemons(data?.pokemon_v2_pokemon ?? []);
    let nextPage =
      dataNextPage?.pokemon_v2_pokemon &&
      dataNextPage?.pokemon_v2_pokemon?.length > 0
        ? true
        : false;
    setHasNextPage(nextPage);
  }, [data?.pokemon_v2_pokemon, dataNextPage?.pokemon_v2_pokemon]);

  const hasSearchMatches = pokemons?.length > 0;

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
      setOffset(offset - itemsPerPage);
    } else if (page === 1) setOffset(0);
  }

  function nextPage() {
    if (page < numberOfPages) {
      setPage(page + 1);
      setOffset(offset + itemsPerPage);
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
      <Header
        setSearchQuery={setSearchQuery}
        setSearchCriteria={setSearchCriteria}
        searchCriteria={searchCriteria}
        setOffset={setOffset}
        setPage={setPage}
      />

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
        hasSearchMatches={hasSearchMatches}
        hasNextPage={hasNextPage}
        setOffset={setOffset}
        setPage={setPage}
        setSelectedOrderBy={setSelectedOrderBy}
        selectedOrderBy={selectedOrderBy}
        setSelectedItemsPerPage={setSelectedItemsPerPage}
        selectedItemsPerPage={selectedItemsPerPage}
      />

      {hasSearchMatches && (!loading || !countLoading) ? (
        <PokemonsList
          show={show}
          setShow={setShow}
          selectedPokemon={selectedPokemon}
          pokemons={pokemons}
          setSelectedPokemon={setSelectedPokemon}
          handleShow={handleShow}
        />
      ) : (
        <div style={ObjectStyles.noResults}>
          <h5>There are no pokemons matching your serch</h5>
        </div>
      )}
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
        hasSearchMatches={hasSearchMatches}
        hasNextPage={hasNextPage}
        setOffset={setOffset}
        setPage={setPage}
        setSelectedOrderBy={setSelectedOrderBy}
        selectedOrderBy={selectedOrderBy}
        setSelectedItemsPerPage={setSelectedItemsPerPage}
        selectedItemsPerPage={selectedItemsPerPage}
      />
    </>
  );
}

export default PokemonsContainer;
