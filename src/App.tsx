import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PokemonsContainer from "./containers/PokemonContainer";
import "./App.css";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://beta.pokeapi.co/graphql/v1beta",
  });

  return (
    <ApolloProvider client={client}>
      <PokemonsContainer />
    </ApolloProvider>
  );
}

export default App;
