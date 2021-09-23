import React from "react";
import { Modal } from "react-bootstrap";
import PokemonDetails from "../components/PokemonDetails";

type Props = {
  show: boolean;
  setShow: (t: boolean) => void;
  pokemon: any;
};

function PokemonModal(props: Props) {
  const { show, setShow, pokemon } = props;

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon?.name ?? "-"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PokemonDetails
          name={pokemon?.name ?? "-"}
          sprite={pokemon?.sprites?.front_default ?? "-"}
          abilities={pokemon?.abilities ?? []}
          stats={pokemon?.stats ?? []}
          types={pokemon?.types ?? []}
        />
      </Modal.Body>
    </Modal>
  );
}

export default PokemonModal;
