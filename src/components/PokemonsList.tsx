import React from "react";
import { Col, Row } from "react-bootstrap";
import Pokemon from "../components/Pokemon";
import PokemonModal from "../components/PokemonModal";
import { useAppStates } from "../contexts/AppStatesContext";

type Props = {
  handleShow: any;
};

const ObjectStyles = {
  containerCol: {
    display: "flex",
  },
  noResults: { minHeight: "20vh", display: "flex", alignItems: "center" },
};

function PokemonsContainer({ handleShow }: Props) {
  const { show, setShow, selectedPokemon, pokemons } = useAppStates();

  return (
    <>
      <PokemonModal show={show} setShow={setShow} pokemon={selectedPokemon} />
      <Row xs={1} md={5} className="g-4">
        {pokemons?.map((pokemon: any) => (
          <Col key={pokemon.id} style={ObjectStyles.containerCol}>
            <Pokemon pokemon={pokemon} openModal={handleShow} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default PokemonsContainer;
