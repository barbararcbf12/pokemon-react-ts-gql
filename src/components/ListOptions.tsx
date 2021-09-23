import React, { Dispatch, SetStateAction } from "react";
import { Button, Nav } from "react-bootstrap";
import { ItemsPerPage } from "../containers/PokemonContainer";

type Props = {
  setitemsPerPage: Dispatch<SetStateAction<ItemsPerPage>>;
  setOrderBy: Dispatch<SetStateAction<any>>;
  previousPage: () => void;
  nextPage: () => void;
  page: number;
  numberOfPages: number;
};

function ListOptions(props: Props) {
  const {
    setitemsPerPage,
    setOrderBy,
    previousPage,
    nextPage,
    page,
    numberOfPages,
  } = props;

  return (
    <Nav
      fill
      style={{
        paddingBottom: "1rem",
      }}
    >
      <Nav.Item>
        <span>Items per page: </span>
        <Button onClick={() => setitemsPerPage(10)}>10</Button> | 
        <Button onClick={() => setitemsPerPage(20)}>20</Button> |{" "}
        <Button onClick={() => setitemsPerPage(50)}>50</Button>
      </Nav.Item>
      <Nav.Item>
        <span>Order list by: </span>
        {/* The idea is to use setOrderBy to change the order_by criteria here */}
        <Button onClick={() => setOrderBy({ name: "asc" })}>name</Button> | 
        <Button onClick={() => setOrderBy({ height: "asc" })}>
          height
        </Button> |{" "}
        <Button onClick={() => setOrderBy({ weight: "asc" })}>weight</Button>
      </Nav.Item>
      <Nav.Item>
        <span>
          Page: {page} of {numberOfPages}
        </span>{" "}
        <Button onClick={() => previousPage()}>Previous</Button>{" "}
        <Button onClick={() => nextPage()}>Next</Button>
      </Nav.Item>
    </Nav>
  );
}

export default ListOptions;
