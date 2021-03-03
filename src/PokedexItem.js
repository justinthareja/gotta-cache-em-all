import React, { useEffect, useState } from "react";
import api from "./api";
import "./PokedexItem.css";
import Spinner from "./Spinner";

function PokedexItem(props) {
  const { name } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});

  useEffect(() => {
    loadDetails();

    async function loadDetails() {
      const result = await api.getPokemonByName(name);
      setDetails(result);
      setIsLoading(false);
    }
  }, [name]);

  if (isLoading) {
    return (
      <li className="PokedexItem">
        <Spinner />
      </li>
    );
  }

  const { id, sprites, types } = details;

  return (
    <li className="PokedexItem">
      <div className="id">{id}</div>
      <div className="name">{name}</div>
      <div className="image-container">
        <img
          className="image"
          src={sprites.other["official-artwork"].front_default}
          alt={name}
        />
      </div>
      <div className="type-container">
        {types.map(({ type }) => (
          <div
            key={`${id}-${type.name}`}
            className={`type type-${type.name.toLowerCase()}`}
          >
            {type.name}
          </div>
        ))}
      </div>
    </li>
  );
}

export default PokedexItem;
