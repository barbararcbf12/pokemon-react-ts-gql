import React from "react";
import { Form, Container, Col, Button } from "react-bootstrap";

type Props = {
  getPokemon: (name: string) => any;
  openModal: () => void;
};

export default function Search(props: Props) {
  const [search, setSearch] = React.useState("");

  return (
    <Container>
      <Form className="mt-2">
        <Col sm={10} className="my-1">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for Pokemon"
          />
        </Col>
        <Col sm={2} className="my-1">
          <Button
            onClick={(e) => {
              props.getPokemon(search);
              props.openModal();
            }}
          >
            Search
          </Button>
        </Col>
      </Form>
    </Container>
  );
}
