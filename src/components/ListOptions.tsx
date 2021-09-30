import React, { Dispatch, SetStateAction, useState } from "react";
import { Badge, Button, ButtonGroup, Nav } from "react-bootstrap";
import { ItemsPerPage } from "../containers/PokemonContainer";

const ObjectStyles = {
  nav: {
    padding: "1rem 0",
  },
  navItem: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0.25rem 0",
  },
  navItemSearch: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navItemSpan: {
    padding: "0 0.5rem 0 0",
  },
};

type Props = {
  setitemsPerPage: Dispatch<SetStateAction<ItemsPerPage>>;
  setOrderBy: Dispatch<SetStateAction<any>>;
  previousPage: () => void;
  nextPage: () => void;
  page: number;
  setNumberOfPages: Dispatch<SetStateAction<any>>;
  totalNumberOfPokemons: number;
  numberOfPages: number;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

function ListOptions(props: Props) {
  const {
    setitemsPerPage,
    setOrderBy,
    previousPage,
    nextPage,
    page,
    setNumberOfPages,
    totalNumberOfPokemons,
    numberOfPages,
    searchQuery,
    setSearchQuery,
  } = props;

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(
    JSON.parse(localStorage.getItem("selectedItemsPerPage")!) || [
      "",
      "active",
      "",
    ]
  );

  const [selectedOrderBy, setSelectedOrderBy] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("selectedOrderBy")!) || ["active", "", ""]
  );

  React.useEffect(() => {
    function updateSelectedItemsPerPage() {
      window.localStorage.setItem(
        "selectedItemsPerPage",
        JSON.stringify(selectedItemsPerPage)
      );
    }
    updateSelectedOrderBy();
    function updateSelectedOrderBy() {
      window.localStorage.setItem(
        "selectedOrderBy",
        JSON.stringify(selectedOrderBy)
      );
    }
    updateSelectedItemsPerPage();
    updateSelectedOrderBy();
  }, [selectedItemsPerPage, selectedOrderBy]);

  return (
    <Nav fill style={ObjectStyles.nav}>
      <Nav.Item style={ObjectStyles.navItemSearch}>
        {searchQuery !== "" ? (
          <>
            <span style={ObjectStyles.navItemSpan}>You've searched for: </span>
            <Button
              variant="primary"
              onClick={() => {
                setSearchQuery("");
              }}
            >
              {searchQuery}{" "}
              <Badge bg="light" text="dark">
                x
              </Badge>
            </Button>
          </>
        ) : (
          ""
        )}
      </Nav.Item>
      <Nav.Item style={ObjectStyles.navItem}>
        <span style={ObjectStyles.navItemSpan}>Items per page: </span>
        <ButtonGroup aria-label="Items per page">
          <Button
            variant="secondary"
            onClick={() => {
              setitemsPerPage(10);
              setNumberOfPages(Math.round(totalNumberOfPokemons / 10));
              setSelectedItemsPerPage(["active", "", ""]);
            }}
            className={selectedItemsPerPage[0]}
          >
            10
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setitemsPerPage(20);
              setNumberOfPages(Math.round(totalNumberOfPokemons / 20));
              setSelectedItemsPerPage(["", "active", ""]);
            }}
            className={selectedItemsPerPage[1]}
          >
            20
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setitemsPerPage(50);
              setNumberOfPages(Math.round(totalNumberOfPokemons / 50));
              setSelectedItemsPerPage(["", "", "active"]);
            }}
            className={selectedItemsPerPage[2]}
          >
            50
          </Button>
        </ButtonGroup>
      </Nav.Item>
      <Nav.Item style={ObjectStyles.navItem}>
        <span style={ObjectStyles.navItemSpan}>Order list by: </span>
        <ButtonGroup aria-label="Order list by">
          <Button
            variant="secondary"
            onClick={() => {
              setOrderBy({ name: "asc" });
              setSelectedOrderBy(["active", "", ""]);
            }}
            className={selectedOrderBy[0]}
          >
            name
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setOrderBy({ height: "asc" });
              setSelectedOrderBy(["", "active", ""]);
            }}
            className={selectedOrderBy[1]}
          >
            height
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setOrderBy({ weight: "asc" });
              setSelectedOrderBy(["", "", "active"]);
            }}
            className={selectedOrderBy[2]}
          >
            weight
          </Button>
        </ButtonGroup>
      </Nav.Item>
      <Nav.Item style={ObjectStyles.navItem}>
        <span style={ObjectStyles.navItemSpan}>
          Page: {page} of {numberOfPages}
        </span>
        <ButtonGroup aria-label="Order list by">
          <Button variant="secondary" onClick={() => previousPage()}>
            Previous
          </Button>
          <Button variant="secondary" onClick={() => nextPage()}>
            Next
          </Button>
        </ButtonGroup>
      </Nav.Item>
    </Nav>
  );
}

export default ListOptions;
