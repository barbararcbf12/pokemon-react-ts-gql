const baseUrl = "http://pokeapi.co/api/v2";
const query = {
  pokemon: "pokemon",
};

export async function fetchPokemon(pokemon: any) {
  return fetch(`${baseUrl}/${query.pokemon}/${pokemon}`);
}
