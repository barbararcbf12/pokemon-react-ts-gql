import React from "react";
import { Badge, Button, ButtonGroup, Nav } from "react-bootstrap";
import { useAppStates } from "../contexts/AppContext";

type Props = {
  previousPage: () => void;
  nextPage: () => void;
};

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

function ListOptions({ previousPage, nextPage }: Props) {
  const {
    setitemsPerPage,
    setOrderBy,
    page,
    setNumberOfPages,
    totalNumberOfPokemons,
    numberOfPages,
    searchQuery,
    setSearchQuery,
    hasSearchMatches,
    hasNextPage,
    setOffset,
    setPage,
    setSelectedOrderBy,
    selectedOrderBy,
    selectedItemsPerPage,
    setSelectedItemsPerPage,
  } = useAppStates();

  React.useEffect(() => {
    function updateSelectedItemsPerPage() {
      window.localStorage.setItem(
        "selectedItemsPerPage",
        JSON.stringify(selectedItemsPerPage)
      );
    }

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
                setOffset(0);
                setPage(1);
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
      {hasSearchMatches ? (
        <>
          <Nav.Item style={ObjectStyles.navItem}>
            <span style={ObjectStyles.navItemSpan}>Items per page: </span>
            <ButtonGroup aria-label="Items per page">
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedItemsPerPage(["active", "", ""]);
                  setOffset(0);
                  setPage(1);
                  setitemsPerPage(10);
                  setNumberOfPages(Math.round(totalNumberOfPokemons / 10));
                }}
                className={selectedItemsPerPage[0]}
              >
                10
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedItemsPerPage(["", "active", ""]);
                  setOffset(0);
                  setPage(1);
                  setitemsPerPage(20);
                  setNumberOfPages(Math.round(totalNumberOfPokemons / 20));
                }}
                className={selectedItemsPerPage[1]}
              >
                20
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedItemsPerPage(["", "", "active"]);
                  setOffset(0);
                  setPage(1);
                  setitemsPerPage(50);
                  setNumberOfPages(Math.round(totalNumberOfPokemons / 50));
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
                  setSelectedOrderBy(["active", "", ""]);
                  setOffset(0);
                  setPage(1);
                  setOrderBy({ name: "asc" });
                }}
                className={selectedOrderBy[0]}
              >
                name
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedOrderBy(["", "active", ""]);
                  setOffset(0);
                  setPage(1);
                  setOrderBy({ height: "asc" });
                }}
                className={selectedOrderBy[1]}
              >
                height
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedOrderBy(["", "", "active"]);
                  setOffset(0);
                  setPage(1);
                  setOrderBy({ weight: "asc" });
                }}
                className={selectedOrderBy[2]}
              >
                weight
              </Button>
            </ButtonGroup>
          </Nav.Item>
          <Nav.Item style={ObjectStyles.navItem}>
            {searchQuery === "" ? (
              <span style={ObjectStyles.navItemSpan}>
                Page: {page} of {numberOfPages}
              </span>
            ) : null}
            <ButtonGroup aria-label="Order list by">
              <Button
                variant="secondary"
                onClick={() => previousPage()}
                disabled={page === 1 ? true : false}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={() => nextPage()}
                disabled={hasNextPage ? false : true}
              >
                Next
              </Button>
            </ButtonGroup>
          </Nav.Item>
        </>
      ) : null}
    </Nav>
  );
}

export default ListOptions;
