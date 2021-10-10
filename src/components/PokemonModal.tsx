import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PokemonDetails from "../components/PokemonDetails";
import { fetchPokemonImage } from "../utils/getPokemonImage";

import noImage from "../resources/no-image.jpg";

type Props = {
  show: boolean;
  setShow: (t: boolean) => void;
  pokemon: any;
};

function PokemonModal(props: Props) {
  const { show, setShow, pokemon } = props;

  const [pokemonImage, setpokemonImage] = useState("");

  useEffect(() => {
    let isMounted = true;

    let image;
    if (pokemon && pokemon?.id && isMounted) {
      image = fetchPokemonImage(pokemon.id);

      image
        ?.then((img) => {
          img ? setpokemonImage(img) : setpokemonImage(noImage);
        })
        .catch(() => {
          console.log("Error");
        });
    }
    return () => {
      isMounted = false;
    };
  }, [pokemon]);

  return (
    <Modal show={show} fullscreen onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon?.name ?? "-"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PokemonDetails
          id={pokemon?.id ?? "-"}
          name={pokemon?.name ?? "-"}
          image={pokemonImage ?? "-"}
          abilities={pokemon?.pokemon_v2_pokemonabilities ?? []}
          stats={pokemon?.pokemon_v2_pokemonstats ?? []}
          types={pokemon?.pokemon_v2_pokemontypes ?? []}
        />
      </Modal.Body>
    </Modal>
  );
}

export default PokemonModal;
