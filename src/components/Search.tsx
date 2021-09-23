import React, { Dispatch } from "react";
import { Form, Container, Col, Button } from "react-bootstrap";

type Props = {
  // getPokemon: (name: string) => any;
  // openModal: () => void;
  setSearchQuery: Dispatch<string>;
};

export default function Search({
  // getPokemon,
  // openModal,
  setSearchQuery,
}: Props) {
  const [search, setSearch] = React.useState("");

  return (
    <Container>
      {/* <Form className="mt-2"> */}
      <Col sm={10} className="my-1">
        <Form.Control
          // onSubmit={(e) => setSearch(e.target.value)}
          onChange={(e) => setSearch(e.target.value)} //setSearchQuery(e.target.value)}
          placeholder="Search for Pokemon"
        />
      </Col>
      <Col sm={2} className="my-1">
        <Button
          onClick={(e) => {
            setSearchQuery(search);
            // openModal();
          }}
        >
          Search
        </Button>
      </Col>
      {/* </Form> */}
    </Container>
  );
}
