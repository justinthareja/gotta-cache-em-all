var Pokedex = (function(global, API, Pagination) {
    var $pokedex;
    
    EVT.on("init", init);
    EVT.on("render", render);
    EVT.on("page-update", render);
    
    function init() {
        $pokedex = document.querySelector(".js-pokedex");
    }

    function append(pokemons) {
        var htmlString = pokedexTemplate(pokemons);
        var $body = stringToHTML(htmlString);

        Array.from($body.children)
             .forEach(function appendPokemon($pokemon) {
                $pokedex.append($pokemon);
            });

    }

    function getPokemonToBeRendered() {
        const pokemon = API.getPokemon();
        const { currentPage, itemsPerPage } = Pagination.getState();
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;

        return pokemon.slice(start, end);
    }

    function render() {
        const pokemons = getPokemonToBeRendered();
        $pokedex.innerHTML = pokedexTemplate(pokemons);
    }

    function pokedexTemplate(pokemons) {
        return pokemons.reduce(
            function pokedexHTML(htmlString, pokemon) {
                return htmlString + pokedexItemTemplate(pokemon);
            },
            ""
        );
    }

    function pokedexItemTemplate(pokemon) {
        var {
            id,
            name,
            sprites,
            types
        } = pokemon;

        return (`
            <li class="pokedex-item pokemon">
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
                            var { type } = cur;
                            var classNames = `pokemon-type type-${type.name.toLowerCase()} text-small`
                            var html = (`
                                        <div class="${classNames}">
                                            ${type.name}
                                        </div>
                                    `);

                            return htmlString + html;
                        },
                        ""
                    )}
                </div>
            </li>
        `);
    }

    var publicAPI = {};
    return publicAPI;
})(this, API, Pagination);

