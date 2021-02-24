var pokemons = [];

init();

async function init() {
    const { results } = await P.getPokemonsList();

    results.forEach((pokemon) => {
        append(parse(template(pokemon)));
    });
}

function append(node) {
    const $pokedex = document.querySelector(".js-pokedex");
    $pokedex.appendChild(node);
}

function parse(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.children[0];
}

function template(pokemon) {
    const { name } = pokemon;

    return (`
        <li class="pokemon" id="${name}" >${name}</li>
    `);
}