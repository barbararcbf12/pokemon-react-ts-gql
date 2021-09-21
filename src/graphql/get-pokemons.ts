import { gql } from "@apollo/client";

// export enum Order {
//   asc,
//   desc,
// }

// export enum Key {
//   height,
//   weight,
//   name,
// }

export const GET_POKEMONS = gql`
  query pokemons(
    $limit: Int
    $offset: Int
    $orderBy: [pokemon_v2_pokemon_order_by!]
  ) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: $orderBy) {
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
