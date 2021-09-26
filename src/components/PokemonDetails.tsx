import React from "react";
import { Row, Col, Card, ProgressBar, Badge } from "react-bootstrap";

export type PokemonType = {
  pokemon_v2_type: {
    name: string;
  };
};

export type PokemonAbilities = {
  pokemon_v2_ability: {
    name: string;
  };
};

export type PokemonStat = {
  base_stat: number | undefined;
  pokemon_v2_stat: {
    name: string;
  };
};

function PokemonDetails(props: any) {
  console.log(props);
  return (
    <Row>
      <Col xs={12} md={6}>
        <Card style={{ marginBottom: 5 }}>
          <Card.Header>
            <img
              src={props.image}
              alt={props.name}
              style={{ width: "-webkit-fill-available" }}
            />
          </Card.Header>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <Card style={{ marginBottom: 5 }}>
          <Card.Body>
            <h5>Abilities</h5>
            {props.abilities?.map((ability: PokemonAbilities, key: string) => (
              <Badge
                key={key}
                bg="secondary"
                style={{
                  margin: 1,
                }}
              >
                {ability?.pokemon_v2_ability?.name}
              </Badge>
            ))}
            <h5>Types</h5>
            {props.types.map((type: PokemonType, key: string) => (
              <Badge bg="primary" key={key}>
                <span>{type.pokemon_v2_type.name}</span>
              </Badge>
            ))}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h4>Base Stats</h4>
            {props.stats.map((stat: PokemonStat, key: string) => (
              <div key={key}>
                <strong>{stat.pokemon_v2_stat?.name}</strong>
                <ProgressBar
                  now={stat.base_stat}
                  max={255}
                  label={stat.base_stat}
                />
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default PokemonDetails;
