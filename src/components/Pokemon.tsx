import React, { useState, useEffect } from "react";
import { Badge, Col, Card, ListGroup } from "react-bootstrap";

function Pokemon({ pokemon }: any) {
  const [pokemonImage, setpokemonImage] = useState("");

  useEffect(() => {
    //I am fetching the image from a different endpoint here because from 'https://beta.pokeapi.co/graphql/v1beta'
    //is return null for 'sprites.other.official-artwork.front_default' for all pokemons
    //I have found the link below where someone says that there's a bug with the graphql engine
    //Link: https://gitmemory.com/issue/PokeAPI/pokeapi/614/826330809
    async function fetchData() {
      let response: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      )
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });
      let image =
        response?.sprites?.other?.["official-artwork"]?.["front_default"];
      setpokemonImage(image);
    }
    fetchData();
  }, [pokemon.id]);

  return (
    <Col>
      <Card
        style={{
          borderRadius: 10,
          boxShadow: "5px 5px 15px -3px rgba(0,0,0,0.61)",
        }}
      >
        <Card.Img variant="top" src={pokemonImage} />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item as="li">
              {/* <ListGroup horizontal> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 2,
                }}
              >
                <Badge bg="primary">height: {pokemon.height}</Badge>
                <Badge bg="primary">weight: {pokemon.weight}</Badge>
              </div>
              {/* </ListGroup> */}
            </ListGroup.Item>
            <ListGroup.Item action variant="warning">
              <Card.Subtitle>
                <div
                  style={{
                    padding: 3,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  abilities
                </div>
              </Card.Subtitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexFlow: "row wrap",
                  padding: 5,
                }}
              >
                {pokemon &&
                  pokemon.pokemon_v2_pokemonabilities.map((ability: any) => (
                    <div
                      key={ability?.pokemon_v2_ability.id}
                      style={{
                        margin: 1,
                      }}
                    >
                      <Badge bg="secondary">
                        {ability.pokemon_v2_ability.name}
                      </Badge>{" "}
                    </div>
                  ))}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Pokemon;
