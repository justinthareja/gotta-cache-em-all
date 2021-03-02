const Pokedex = require("pokeapi-js-wrapper");
const options = {
  timeout: 5 * 1000,
  cache: true,
  cacheImages: true,
};

const P = new Pokedex.Pokedex(options);

export default P;
