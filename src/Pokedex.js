import React, { useEffect } from "react";
import "./Pokedex.css";
import api from "./api";

function Pokedex() {
  useEffect(() => {
    fetchPokemons();

    async function fetchPokemons() {
      const { results } = await api.getPokemonsList();
      console.log(results);
    }
  }, []);

  return <ul className="Pokedex">A List of pokemon</ul>;
}

export default Pokedex;
