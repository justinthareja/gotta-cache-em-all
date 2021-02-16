var pokeAPI = (function makeAPI(global) {
    const API_URL = "https://pokeapi.co/api/v2";
    var prevURL = "";
    var nextURL = "";

    EVT.on("init", loadPokemon);
    EVT.on("pagination-next-clicked", loadNext);
    EVT.on("pagination-previous-clicked", loadPrevious);
    
    function fetchJSON(...args) {
        return fetch(...args).then(function toJSON(response) {
            return response.json();
        });
    }

    function loadPrevious() {
        return fetchJSON(prevURL)
            .then(loadDetails)
            .then(emitPrevLoadSuccess);
    }

    function loadNext() {
        return fetchJSON(nextURL)
            .then(loadDetails)
            .then(emitNextLoadSuccess);
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
            .then(emitPokemonLoadSuccess);
    }
    
    function getPokemonList(options = {}) {
        var {
            limit = 20,
            offset = 0
        } = options;
    
        var url = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;
        return fetchJSON(url);
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

    var publicAPI = {};
    return publicAPI;

})(this);