import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      height
      weight
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
          id
        }
      }
    }
  }
`;
