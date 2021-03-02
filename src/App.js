import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./api.js";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function initPokemons() {
      const { results } = await api.getPokemonsList();

      setPokemons(results);
    }

    initPokemons();
  }, []);

  return (
    <ul className="Pokedex">
      {pokemons.length === 0 ? (
        <h1>No pokemons here :(</h1>
      ) : (pokemons.map(pokemon =>)
        <h1>yay pokemons here!</h1>
      )}
    </ul>
  );
}

export default App;
