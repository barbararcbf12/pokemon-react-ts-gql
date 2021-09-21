import React from "react";
import { Spinner, Alert, Modal } from "react-bootstrap";
import PokemonDetails from "../components/PokemonDetails";
import {
  spinnerStyle,
  spinnerWrapperStyle,
  PokemonSearch,
} from "../containers/PokemonContainer";

type Props = {
  show: boolean;
  setShow: (t: boolean) => void;
  pokemon: PokemonSearch | undefined;
  error: boolean;
  errorMsg: string;
  loading: boolean;
};

function PokemonModal(props: Props) {
  const { show, setShow, pokemon, error, errorMsg, loading } = props;

  //Rendering dependingo on responses
  if (loading) {
    return (
      <div style={spinnerWrapperStyle}>
        <Spinner style={spinnerStyle} animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{errorMsg}test</Alert>;
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>You have searched for {}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PokemonDetails
          name={pokemon?.name ?? "-"}
          sprite={pokemon?.sprites.front_default ?? "-"}
          abilities={pokemon?.abilities ?? "-"}
          stats={pokemon?.stats ?? "-"}
          types={pokemon?.types ?? "-"}
        />
      </Modal.Body>
    </Modal>
  );
}

export default PokemonModal;
