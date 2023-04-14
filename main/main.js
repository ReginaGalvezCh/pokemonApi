const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
};

const fetchPokemons = async () => {
    const pokemons = [];

    for (let i = 1; i <= 150; i++) {
        const pokemonData = await getPokemonData(i);
        pokemons.push(pokemonData);
    }

    return pokemons;
};
const createPokemonCard = (pokemon) => {
    return `
        <div class="col-md-4 col-sm-6 mb-4">
            <div class="card">
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name.toUpperCase()}</h5>
                    <p class="card-text">ID: ${pokemon.id}</p>
                </div>
            </div>
        </div>`;
};

const displayPokemons = async () => {
    const pokemons = await fetchPokemons();
    const gallery = document.getElementById("pokemon-gallery");
    
    pokemons.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);
        gallery.innerHTML += pokemonCard;
    });
};

// Call the displayPokemons function to display the Pokémon cards
displayPokemons();
