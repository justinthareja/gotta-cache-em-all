var pokeAPI = (function makeAPI(global) {
    const API_URL = "https://pokeapi.co/api/v2";

    var LIMIT = 20;
    var prevURL = "";
    var nextURL = "";

    EVT.on("init", init);
    EVT.on("pagination-next-clicked", loadNext);
    EVT.on("pagination-previous-clicked", loadPrevious);
    EVT.on("pagination-number-clicked", loadPage);
    
    function init() {
        loadPokemon();
    }

    function fetchJSON(...args) {
        return fetch(...args).then(function toJSON(response) {
            return response.json();
        });
    }

    function loadPrevious() {
        return fetchJSON(prevURL)
            .then(loadDetails)
            .then(emitPrevLoadSuccess)
    }

    function loadNext() {
        if (!nextURL) return;

        return fetchJSON(nextURL)
            .then(loadDetails)
            .then(emitNextLoadSuccess)
    }

    function loadPage(pageNumber) {
        const offset = (pageNumber - 1) * LIMIT;

        return getPokemonList({ offset })
            .then(loadDetails)
            .then(emitPageLoadSuccess)
    }

    function loadDetails(response) {
        var { results, next, previous } = response;
        
        prevURL = previous;
        nextURL = next;

        return Promise.all(
            results.map(function fetchDetails(result) {
                return fetchJSON(result.url);
            })
        );
    }
    
    function loadPokemon() {
        return getPokemonList()
            .then(loadDetails)
            .then(emitPokemonLoadSuccess)
    }
    
    function getPokemonList(options = {}) {
        return fetchJSON(makeListURL(options));
    }

    function makeListURL(interval) {
        const { 
            limit = LIMIT, 
            offset = 0 
        } = interval;

        return `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;
    }

    function emitPokemonLoadSuccess(pokemon) {
        EVT.emit("pokemon-load-success", pokemon);
    }

    function emitNextLoadSuccess(pokemon) {
        EVT.emit("next-load-success", pokemon)
    }

    function emitPrevLoadSuccess(pokemon) {
        EVT.emit("previous-load-success", pokemon);
    }

    function emitPageLoadSuccess(pokemon) {
        EVT.emit("page-load-success", pokemon);
    }

    var publicAPI = {};

    return publicAPI;

})(this);