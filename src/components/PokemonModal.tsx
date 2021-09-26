import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PokemonDetails from "../components/PokemonDetails";

type Props = {
  show: boolean;
  setShow: (t: boolean) => void;
  pokemon: any;
};

function PokemonModal(props: Props) {
  const { show, setShow, pokemon } = props;

  const [pokemonImage, setpokemonImage] = useState("");

  useEffect(() => {
    //I am fetching the image from a different endpoint here because from 'https://beta.pokeapi.co/graphql/v1beta'
    //is return null for 'sprites.other.official-artwork.front_default' for all pokemons
    //I have found the link below where someone says that there's a bug with the graphql engine
    //Link: https://gitmemory.com/issue/PokeAPI/pokeapi/614/826330809
    async function fetchData(id: number) {
      let response: any = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });
      let image =
        response?.sprites?.other?.["official-artwork"]?.["front_default"];
      setpokemonImage(image);
    }
    if (pokemon && pokemon?.id) {
      fetchData(pokemon.id);
    }
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
