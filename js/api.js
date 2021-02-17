var API = (function makeAPI(global) {
    const API_URL = "https://pokeapi.co/api/v2";
    const pokemon = [];

    var LIMIT = 20;
    var prevURL = "";
    var nextURL = "";

    EVT.on("init", init);
    EVT.on("initial-load-success", loadNext);
    EVT.on("next-load-success", loadNext);
    
    function init() {
        return getPokemonList()
            .then(loadDetails)
            .then(emitRender)
            .then(emitInitialLoadSuccess)
    }

    function getPokemon() {
        return pokemon;
    }

    function fetchJSON(...args) {
        return fetch(...args).then(function toJSON(response) {
            return response.json();
        });
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
        ).then(function cache(p) {
            pokemon.push(...p);
            return p;
        });
    }
    
    function getPokemonList(interval = {}) {
        const {
            limit = LIMIT,
            offset = 0
        } = interval;

        const url = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;

        return fetchJSON(url);
    }

    function emitInitialLoadSuccess(pokemon) {
        EVT.emit("initial-load-success", pokemon);
    }

    function emitNextLoadSuccess(pokemon) {
        EVT.emit("next-load-success", pokemon)
    }

    function emitPageLoadSuccess(pokemon) {
        EVT.emit("page-load-success", pokemon);
    }

    function emitRender(pokemon) {
        EVT.emit("render", pokemon);
    }

    var publicAPI = {
        getPokemon
    };

    return publicAPI;

})(this);