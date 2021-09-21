import { gql } from "@apollo/client";

export const COUNT_POKEMONS = gql`
  query countPokemons {
    pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;
