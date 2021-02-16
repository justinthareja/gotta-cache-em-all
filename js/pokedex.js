var Pokedex = (function(global) {
    var $pokedex;
    
    EVT.on("init", init);
    EVT.on("pokemon-load-success", render);
    EVT.on("next-load-success", render);
    EVT.on("previous-load-success", render);
    
    function init() {
        $pokedex = document.querySelector(".js-pokedex");
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
        var {
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
            </div>
        `);
    }

    var publicAPI = {};
    return publicAPI;
})(this);

