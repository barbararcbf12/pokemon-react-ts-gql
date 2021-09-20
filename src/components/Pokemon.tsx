import React, { useState, useEffect } from "react";

function Pokemon({ pokemon }: any) {
  const [pokemonImage, setpokemonImage] = useState("");

  useEffect(() => {
    //I am fetching the image from a different endpoint here because from 'https://beta.pokeapi.co/graphql/v1beta'
    //is return null for 'sprites.other.official-artwork.front_default' for all pokemons
    //I have found the link below where someone says that there's a bug with the graphql engine
    //Link: https://gitmemory.com/issue/PokeAPI/pokeapi/614/826330809
    async function fetchData() {
      let response: any = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      )
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });
      let image =
        response?.sprites?.other?.["official-artwork"]?.["front_default"];
      setpokemonImage(image);
    }
    fetchData();
  }, [pokemon.id]);

  return (
    <>
      <div className="pokemon" key={pokemon.id}>
        <div className="pokemon__name">
          <p>{pokemon.name}</p>
        </div>
        <div className="pokemon__meta">
          <span>HEIGHT: {pokemon.height}</span>
          <span>WEIGHT: {pokemon.weight}</span>
        </div>
        <div className="pokemon__image">
          <img src={pokemonImage} alt={pokemon.name} />
        </div>
        <div className="pokemon__attacks">
          <span>ABILITIES:</span>
          {pokemon &&
            pokemon.pokemon_v2_pokemonabilities.map((ability: any) => (
              <span key={`${ability.pokemon_v2_ability.id}`}>
                {ability.pokemon_v2_ability.name}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}

export default Pokemon;
