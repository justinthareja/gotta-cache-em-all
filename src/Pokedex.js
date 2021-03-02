import React, { useEffect, useState } from "react";
import "./Pokedex.css";
import api from "./api";
import PokedexItem from "./PokedexItem";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPokemons();

    async function loadPokemons() {
      const { results } = await api.getPokemonsList();
      setPokemons(results);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ul className="Pokedex">
      {pokemons.length === 0 ? (
        <h1>No Pokemons here :(</h1>
      ) : (
        pokemons.map((pokemon) => (
          <PokedexItem key={pokemon.name} {...pokemon} />
        ))
      )}
    </ul>
  );
}

export default Pokedex;
