import React from "react";

function PokedexItem(props) {
  const { name } = props;
  return <div className="PokedexItem">{name}</div>;
}

export default PokedexItem;
