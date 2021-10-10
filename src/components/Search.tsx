import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  ToggleButton,
} from "react-bootstrap";
import { useAppStates } from "../contexts/AppContext";

const radios = [
  { name: "Name", value: "name" },
  { name: "Ability", value: "ability" },
];

const ObjectStyles = {
  label: {
    padding: "0 0.5rem 0 0",
    display: "flex",
    alignItems: "center",
  },
  col: { paddingRight: 5 },
};

export default function Search() {
  const {
    setSearchQuery,
    searchCriteria,
    setSearchCriteria,
    setOffset,
    setPage,
  } = useAppStates();

  const [search, setSearch] = useState("");

  return (
    <Container>
      <Col sm={4} className="my-1" style={ObjectStyles.col}>
        <ButtonGroup className="mb-2">
          <span style={ObjectStyles.label}> Search pokemons by:</span>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="primary"
              name="radio"
              value={radio.value}
              checked={searchCriteria === radio.value}
              onChange={(e) => {
                setSearchCriteria(e.currentTarget.value);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Col>
      <Col sm={7} className="my-1" style={ObjectStyles.col}>
        <Form.Control
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            searchCriteria === "name"
              ? "Type a Pokemon name"
              : "Type a Pokemon ability"
          }
          className="me-2"
          aria-label="Search"
          data-testid={"search-field"}
        />
      </Col>
      <Col sm={1} className="my-1">
        <Button
          data-testid={"search-button"}
          onClick={(e) => {
            setOffset(0);
            setPage(1);
            setSearchQuery(search.toLowerCase());
          }}
        >
          Search
        </Button>
      </Col>
    </Container>
  );
}
