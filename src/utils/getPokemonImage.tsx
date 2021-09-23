//I am fetching the image from a different endpoint here because from 'https://beta.pokeapi.co/graphql/v1beta'
//is return null for 'sprites.other.official-artwork.front_default' for all pokemons
//I have found the link below where someone says that there's a bug with the graphql engine
//Link: https://gitmemory.com/issue/PokeAPI/pokeapi/614/826330809
export async function fetchPokemonImage(id: number) {
  let responseData: any = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Error:", error);
    });
  let image =
    responseData.sprites?.other?.["official-artwork"]?.["front_default"];
  return image;
}
