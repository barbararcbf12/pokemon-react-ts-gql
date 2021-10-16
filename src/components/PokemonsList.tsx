import React, { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Pokemon from "../components/Pokemon";
import PokemonModal from "../components/PokemonModal";
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
    page,
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
    hasSearchMatches,
    show,
    setShow,
    selectedPokemon,
    pokemons,
  } = useAppStates();

  useEffect(() => {
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

  useEffect(() => {
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
    setHasNextPage,
    setPokemons,
  ]);

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
      {hasSearchMatches && (!loading || !countLoading) ? (
        <Row xs={1} md={5} className="g-4">
          <PokemonModal
            show={show}
            setShow={setShow}
            pokemon={selectedPokemon}
          />
          {pokemons?.map((pokemon: any) => (
            <Col key={pokemon.id} style={ObjectStyles.containerCol}>
              <Pokemon pokemon={pokemon} openModal={handleShow} />
            </Col>
          ))}
        </Row>
      ) : (
        <div style={ObjectStyles.noResults}>
          <h5>There are no pokemons matching your serch</h5>
        </div>
      )}
    </>
  );
}

export default PokemonsContainer;
