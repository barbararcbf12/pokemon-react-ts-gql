import React, { useEffect, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { fetchPokemonImage } from "../utils/getPokemonImage";
import { useAppStates } from "../contexts/AppStatesContext";

import noImage from "../resources/no-image.jpg";

type Props = {
  pokemon: any;
  openModal: () => void;
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

function Pokemon({ pokemon, openModal }: Props) {
  const { setSelectedPokemon } = useAppStates();
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
  }, [pokemon, pokemon?.id]);

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
