var Pokedex = (function(global) {
    var $pokedex;
    
    EVT.on("init", init);
    EVT.on("pokemon-load-success", render);
    EVT.on("next-load-success", render);
    EVT.on("previous-load-success", render);
    EVT.on("page-load-success", render);
    
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

    function render(pokemons) {
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
})(this);

