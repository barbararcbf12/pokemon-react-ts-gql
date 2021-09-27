import React, { Dispatch } from "react";
import { Form, Container, Col, Button } from "react-bootstrap";

type Props = {
  setSearchQuery: Dispatch<string>;
};

export default function Search({ setSearchQuery }: Props) {
  const [search, setSearch] = React.useState("");

  return (
    <Container>
      <Col sm={10} className="my-1" style={{ paddingRight: 5 }}>
        <Form.Control
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a Pokemon"
          className="me-2"
          aria-label="Search"
          data-testid={"search-field"}
        />
      </Col>
      <Col sm={2} className="my-1">
        <Button
          data-testid={"search-button"}
          onClick={(e) => {
            setSearchQuery(search.toLowerCase());
          }}
        >
          Search
        </Button>
      </Col>
    </Container>
  );
}
