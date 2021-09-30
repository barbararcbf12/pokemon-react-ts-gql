import React, { Dispatch, useEffect, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";

import noImge from "../resources/no-image.jpg";

type Props = {
  pokemon: any;
  openModal: () => void;
  setSelectedPokemon: Dispatch<any>;
};

const ObjectStyles = {
  abilitiesList: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "row wrap",
    padding: 5,
  },
  badge: {
    margin: 2,
  },
  body: { width: "100%" },
  card: {
    borderRadius: 10,
    boxShadow: "5px 5px 15px -3px rgba(0,0,0,0.61)",
    width: "100%",
  },
  cardSubtitle: {
    padding: 3,
    display: "flex",
    justifyContent: "center",
  },
  listGroupItem: {
    padding: "0.5rem 0",
    justifyContent: "center",
  },
};

function Pokemon({ pokemon, openModal, setSelectedPokemon }: Props) {
  const [pokemonImage, setpokemonImage] = useState("");

  useEffect(() => {
    let isMounted = true;
    //I am fetching the image from a different endpoint here because from 'https://beta.pokeapi.co/graphql/v1beta'
    //is returning null for 'sprites.other.official-artwork.front_default' for all pokemons.
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
        response?.sprites?.other?.["official-artwork"]?.["front_default"] ??
        noImge;
      if (isMounted) setpokemonImage(image);
    }
    fetchData(pokemon.id);
    return () => {
      isMounted = false;
    };
  }, [pokemon.id]);

  return (
    <>
      <Card
        as="button"
        data-testid={"pokemon-card"}
        onClick={() => {
          openModal();
          setSelectedPokemon(pokemon);
        }}
        style={ObjectStyles.card}
        aria-label={pokemon.name}
      >
        <Card.Img variant="top" src={pokemonImage} alt={pokemon.name} />
        <Card.Body style={ObjectStyles.body}>
          <Card.Title>{pokemon.name}</Card.Title>
          <ListGroup variant="flush" as="ul">
            <ListGroup.Item as="li" style={ObjectStyles.listGroupItem}>
              <Badge bg="primary" style={ObjectStyles.badge}>
                height: {pokemon.height}
              </Badge>
              <Badge bg="primary" style={ObjectStyles.badge}>
                weight: {pokemon.weight}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item variant="warning">
              <Card.Subtitle style={ObjectStyles.cardSubtitle}>
                abilities
              </Card.Subtitle>
              <div style={ObjectStyles.abilitiesList}>
                {pokemon &&
                  pokemon?.pokemon_v2_pokemonabilities?.map((ability: any) => (
                    <div
                      key={ability?.pokemon_v2_ability?.id}
                      style={ObjectStyles.badge}
                    >
                      <Badge bg="secondary">
                        {ability.pokemon_v2_ability?.name}
                      </Badge>{" "}
                    </div>
                  ))}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default Pokemon;
