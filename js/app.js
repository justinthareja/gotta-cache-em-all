const API_URL = "https://pokeapi.co/api/v2";
const $pokedex = document.querySelector(".js-pokedex");

init();

function fetchJSON(...args) {
    return fetch(...args).then(function toJSON(response) {
        return response.json();
    });
}

function getPokemon(options = {}) {
    const {
        limit = 20,
        offset = 0
    } = options;
    
    const url = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;
    return fetchJSON(url);
}


function loadPokemon () {
    return getPokemon()
        .then(function(response) {
            const { results } = response;

            return Promise.all(
                results.map(function fetchDetails(result) {
                    return fetchJSON(result.url);
                })
            );
        })
}

function init () {
    return loadPokemon().then(render);
}

function render(pokemons) {
    $pokedex.innerHTML = pokemons.reduce(
        function pokedexHTML(htmlString, pokemon) {
            return htmlString + pokedexItemTemplate(pokemon);
        }, 
        ""
    );
}

function pokedexItemTemplate(pokemon) {
    const { 
        id,
        name,
        sprites,
        types
     } = pokemon;

    return (`
        <div class="pokedex-item pokemon">
            <div class="pokemon-number">${id}</div>
            <div class="pokemon-name h5">${name}</div>
            <div class="pokemon-image-container">
                <img
                class="pokemon-image"
                src="${sprites.other["official-artwork"].front_default}" 
                alt="${name} image">
            </div>
            <div class="pokemon-type-container">
                ${types.reduce(
                    function typeHtml(htmlString, cur) {
                        const { type } = cur;
                        const classNames = `pokemon-type type-${type.name.toLowerCase()} text-small`
                        const html = (`
                            <div class="${classNames}">
                                ${type.name}
                            </div>
                        `);

                        return htmlString + html;
                    },
                    ""
                )}
            </div>
        </div>
    `);
}