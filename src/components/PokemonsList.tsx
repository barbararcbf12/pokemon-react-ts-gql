import React from "react";
import { Col, Row } from "react-bootstrap";
import Pokemon from "../components/Pokemon";
import PokemonModal from "../components/PokemonModal";

const ObjectStyles = {
  containerCol: {
    display: "flex",
  },
  noResults: { minHeight: "20vh", display: "flex", alignItems: "center" },
};

function PokemonsContainer(props: any) {
  const {
    show,
    setShow,
    selectedPokemon,
    pokemons,
    setSelectedPokemon,
    handleShow,
  } = props;

  return (
    <>
      <PokemonModal show={show} setShow={setShow} pokemon={selectedPokemon} />
      <Row xs={1} md={5} className="g-4">
        {pokemons?.map((pokemon: any) => (
          <Col key={pokemon.id} style={ObjectStyles.containerCol}>
            <Pokemon
              pokemon={pokemon}
              openModal={handleShow}
              setSelectedPokemon={setSelectedPokemon}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default PokemonsContainer;
