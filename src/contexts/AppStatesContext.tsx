import { ApolloError } from "apollo-client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import {
  CountPokemonsQuery,
  PokemonsQuery,
  useCountPokemonsQuery,
  usePokemonsQuery,
} from "../generated/graphql";

export type ItemsPerPage = 10 | 20 | 50;

type Props = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchCriteria: string;
  setSearchCriteria: Dispatch<string>;
  offset: number;
  setOffset: Dispatch<number>;
  page: number;
  setPage: Dispatch<number>;
  selectedOrderBy: Array<string>;
  setSelectedOrderBy: Dispatch<Array<string>>;
  selectedItemsPerPage: Array<string>;
  setSelectedItemsPerPage: Dispatch<Array<string>>;
  itemsPerPage: ItemsPerPage;
  setitemsPerPage: Dispatch<SetStateAction<ItemsPerPage>>;
  orderBy: any;
  setOrderBy: Dispatch<SetStateAction<any>>;
  data: PokemonsQuery | undefined;
  error: ApolloError | undefined;
  loading: boolean;
  pokemons: Array<any>;
  setPokemons: Dispatch<any>;
  dataNextPage: any;
  hasNextPage: boolean;
  setHasNextPage: Dispatch<boolean>;
  countData: CountPokemonsQuery | undefined;
  countError: ApolloError | undefined;
  countLoading: boolean;
  numberOfPages: number;
  setNumberOfPages: Dispatch<number>;
  totalNumberOfPokemons: number;
  hasSearchMatches: boolean;
  selectedPokemon: any;
  setSelectedPokemon: Dispatch<React.SetStateAction<any>>;
  show: boolean;
  setShow: Dispatch<boolean>;
};

const initialValues: Props = {
  searchQuery: "",
  setSearchQuery: () => "",
  searchCriteria: "name",
  setSearchCriteria: () => "name",
  offset: 0,
  setOffset: () => 0,
  page: 1,
  setPage: () => 1,
  selectedOrderBy: ["active", "", ""],
  setSelectedOrderBy: () => ["active", "", ""],
  selectedItemsPerPage: ["", "active", ""],
  setSelectedItemsPerPage: () => ["", "active", ""],
  itemsPerPage: 20,
  setitemsPerPage: () => 20,
  orderBy: "name",
  setOrderBy: () => "name",
  data: undefined,
  error: undefined,
  loading: false,
  pokemons: [],
  setPokemons: () => [],
  dataNextPage: [],
  hasNextPage: true,
  setHasNextPage: () => true,
  countData: undefined,
  countError: undefined,
  countLoading: false,
  numberOfPages: 0,
  setNumberOfPages: () => 0,
  totalNumberOfPokemons: 0,
  hasSearchMatches: false,
  selectedPokemon: undefined,
  setSelectedPokemon: () => undefined,
  show: false,
  setShow: () => false,
};

const AppStatesContext = createContext(initialValues);

function AppProvider({ ...props }) {
  //Search states
  const [searchQuery, setSearchQuery] = useState<string>(
    JSON.parse(localStorage.getItem("searchQuery")!) || ""
  );

  const [searchCriteria, setSearchCriteria] = useState("name");

  const [offset, setOffset] = useState<number>(
    JSON.parse(localStorage.getItem("offset")!) || 0
  );

  const [page, setPage] = useState<number>(
    JSON.parse(localStorage.getItem("page")!) || 1
  );

  const [selectedOrderBy, setSelectedOrderBy] = useState<Array<string>>(
    JSON.parse(localStorage.getItem("selectedOrderBy")!) || ["active", "", ""]
  );

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(
    JSON.parse(localStorage.getItem("selectedItemsPerPage")!) || [
      "",
      "active",
      "",
    ]
  );

  //Pagination states & functions
  const [itemsPerPage, setitemsPerPage] = useState<ItemsPerPage>(
    JSON.parse(localStorage.getItem("itemsPerPage")!) || 20
  );

  //State to change order_by criteria
  const [orderBy, setOrderBy] = useState<any>(
    JSON.parse(localStorage.getItem("orderBy")!) || { name: "asc" }
  );

  //Fetch pokemons from Graphql api
  const options = {
    variables: {
      limit: itemsPerPage,
      offset,
      orderBy,
      pokemonName: searchCriteria === "name" ? searchQuery : "",
      pokemonAbility: searchCriteria === "name" ? "" : searchQuery,
    },
  };

  const { data, error, loading } = usePokemonsQuery(options);

  const [pokemons, setPokemons] = useState<any>([]);

  //Fetch NEXT PAGE from Graphql api
  const nextPageOptions = {
    variables: {
      limit: itemsPerPage,
      offset: offset + itemsPerPage,
      orderBy,
      pokemonName: searchCriteria === "name" ? searchQuery : "",
      pokemonAbility: searchCriteria === "name" ? "" : searchQuery,
    },
  };
  const { data: dataNextPage } = usePokemonsQuery(nextPageOptions);

  const [hasNextPage, setHasNextPage] = useState(true);

  //Find total number of pages
  const {
    data: countData,
    error: countError,
    loading: countLoading,
  } = useCountPokemonsQuery();

  let totalNumberOfPokemons = Math.round(
    countData?.pokemon_v2_pokemon_aggregate?.aggregate?.count ??
      1118 / itemsPerPage
  );

  const [numberOfPages, setNumberOfPages] = useState(totalNumberOfPokemons);

  const hasSearchMatches = pokemons?.length > 0;

  const [selectedPokemon, setSelectedPokemon] = useState();

  //Modal states & function
  const [show, setShow] = useState(false);

  const value = {
    searchQuery,
    setSearchQuery,
    searchCriteria,
    setSearchCriteria,
    offset,
    setOffset,
    page,
    setPage,
    selectedOrderBy,
    setSelectedOrderBy,
    selectedItemsPerPage,
    setSelectedItemsPerPage,
    itemsPerPage,
    setitemsPerPage,
    orderBy,
    setOrderBy,
    data,
    error,
    loading,
    pokemons,
    setPokemons,
    dataNextPage,
    hasNextPage,
    setHasNextPage,
    countData,
    countError,
    countLoading,
    numberOfPages,
    setNumberOfPages,
    totalNumberOfPokemons,
    hasSearchMatches,
    selectedPokemon,
    setSelectedPokemon,
    show,
    setShow,
  };

  return <AppStatesContext.Provider value={value} {...props} />;
}

function useAppStates() {
  const context = React.useContext(AppStatesContext);
  if (context === undefined) {
    throw new Error(`useCounter must be used within a CounterProvider`);
  }
  return context;
}

//To improve ListOptions component later
// const increment = (dispatch) => dispatch({ type: "increment" });
// const decrement = (dispatch) => dispatch({ type: "decrement" });

export { AppProvider, useAppStates }; //, increment, decrement };
