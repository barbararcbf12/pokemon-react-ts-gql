import React, { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import PokemonsList from "../components/PokemonsList";
import ListOptions from "../components/ListOptions";
import Header from "../components/Header";
import { useAppStates } from "../contexts/AppStatesContext";

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

const ObjectStyles = {
  containerCol: {
    display: "flex",
  },
  noResults: { minHeight: "20vh", display: "flex", alignItems: "center" },
};

function PokemonsContainer() {
  const {
    searchQuery,
    offset,
    setOffset,
    page,
    setPage,
    itemsPerPage,
    orderBy,
    data,
    error,
    loading,
    setPokemons,
    dataNextPage,
    setHasNextPage,
    countData,
    countError,
    countLoading,
    numberOfPages,
    hasSearchMatches,
    setShow,
  } = useAppStates();

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

  React.useEffect(() => {
    function updateSearchQuery() {
      window.localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
    }
    updateSearchQuery();
  }, [searchQuery]);

  function handleShow() {
    setShow(true);
  }

  useEffect(() => {
    setPokemons(data?.pokemon_v2_pokemon ?? []);
    let nextPage =
      dataNextPage?.pokemon_v2_pokemon &&
      dataNextPage?.pokemon_v2_pokemon?.length > 0
        ? true
        : false;
    setHasNextPage(nextPage);
  }, [
    data?.pokemon_v2_pokemon,
    dataNextPage?.pokemon_v2_pokemon,
    setHasNextPage, //
    setPokemons, //
  ]);

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
      <Header />

      <ListOptions previousPage={previousPage} nextPage={nextPage} />

      {hasSearchMatches && (!loading || !countLoading) ? (
        <PokemonsList handleShow={handleShow} />
      ) : (
        <div style={ObjectStyles.noResults}>
          <h5>There are no pokemons matching your serch</h5>
        </div>
      )}
      <ListOptions previousPage={previousPage} nextPage={nextPage} />
    </>
  );
}

export default PokemonsContainer;
