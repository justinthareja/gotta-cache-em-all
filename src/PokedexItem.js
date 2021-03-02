import React from "react";

function PokedexItem(props) {
  const { name } = props;
  return <li className="PokedexItem">{name}</li>;
}

export default PokedexItem;
