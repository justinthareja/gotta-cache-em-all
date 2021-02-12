const BASE_URL = "https://pokeapi.co/api/v2/";

fetch(BASE_URL + "pokemon")
    .then(response => response.json())
    .then(data => console.log(data));