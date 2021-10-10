import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PokemonsContainer from "./containers/PokemonContainer";
import { AppProvider } from "./contexts/AppContext";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://beta.pokeapi.co/graphql/v1beta",
  });

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <PokemonsContainer />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
