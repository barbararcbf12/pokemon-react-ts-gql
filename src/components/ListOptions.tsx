import React, { useEffect } from "react";
import { Badge, Button, ButtonGroup, Nav } from "react-bootstrap";
import { useAppStates } from "../contexts/AppStatesContext";

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

function ListOptions() {
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
    previousPage,
    nextPage,
  } = useAppStates();

  useEffect(() => {
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

  //Number of Items per page - functions
  const numberOfElements10 = (dispatchSelected: any, dispatchAction: any) => {
    dispatchSelected(["active", "", ""]);
    dispatchAction(10);
  };
  const numberOfElements20 = (dispatchSelected: any, dispatchAction: any) => {
    dispatchSelected(["", "active", ""]);
    dispatchAction(20);
  };
  const numberOfElements50 = (dispatchSelected: any, dispatchAction: any) => {
    dispatchSelected(["", "", "active"]);
    dispatchAction(50);
  };

  //Order by - functions
  const orderByName = (dispatchSelected: any, dispatchAction: any) => {
    dispatchSelected(["active", "", ""]);
    dispatchAction({ name: "asc" });
  };
  const orderByHeight = (dispatchSelected: any, dispatchAction: any) => {
    dispatchSelected(["", "active", ""]);
    dispatchAction({ height: "asc" });
  };
  const orderByWeight = (dispatchSelected: any, dispatchAction: any) => {
    dispatchSelected(["", "", "active"]);
    dispatchAction({ weight: "asc" });
  };

  //Paging - functions
  const resetPage = (itemsPerPage?: number) => {
    setOffset(0);
    setPage(1);
    if (itemsPerPage)
      setNumberOfPages(Math.round(totalNumberOfPokemons / itemsPerPage));
  };

  return (
    <Nav fill style={ObjectStyles.nav}>
      <Nav.Item style={ObjectStyles.navItemSearch}>
        {searchQuery !== "" ? (
          <>
            <span style={ObjectStyles.navItemSpan}>You've searched for: </span>
            <Button
              variant="primary"
              onClick={() => {
                resetPage();
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
                  numberOfElements10(setSelectedItemsPerPage, setitemsPerPage);
                  resetPage(10);
                }}
                className={selectedItemsPerPage[0]}
              >
                10
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  numberOfElements20(setSelectedItemsPerPage, setitemsPerPage);
                  resetPage(20);
                }}
                className={selectedItemsPerPage[1]}
              >
                20
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  numberOfElements50(setSelectedItemsPerPage, setitemsPerPage);
                  resetPage(50);
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
                  orderByName(setSelectedOrderBy, setOrderBy);
                  resetPage();
                }}
                className={selectedOrderBy[0]}
              >
                name
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  orderByHeight(setSelectedOrderBy, setOrderBy);
                  resetPage();
                }}
                className={selectedOrderBy[1]}
              >
                height
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  orderByWeight(setSelectedOrderBy, setOrderBy);
                  resetPage();
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
