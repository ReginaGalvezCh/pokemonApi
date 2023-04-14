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
