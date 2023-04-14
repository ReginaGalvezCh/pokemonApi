const getPokemonData = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
};

const fetchAllPokemons = async () => {
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
    const gallery = document.getElementById("pokemon-gallery");
    const pokemons = await fetchAllPokemons();
    let displayedCount = 0;
    const batchSize = 50;

    const displayBatch = () => {
        const batch = pokemons.slice(displayedCount, displayedCount + batchSize);
        const pokemonCards = batch.map((pokemon) => createPokemonCard(pokemon)).join('');
        gallery.innerHTML += pokemonCards;
        displayedCount += batchSize;
        if (displayedCount < pokemons.length) {
            gallery.innerHTML += loadMorePlaceholder;
            const button = document.querySelector('.load-more-placeholder button');
            button.addEventListener('click', () => {
                gallery.removeChild(button.parentElement);
                displayBatch();
            });
        }
    };

    const loadMorePlaceholder = `
        <div class="col-12 mb-4 text-center load-more-placeholder">
            <button class="btn btn-primary">Load more</button>
        </div>`;
    displayBatch();
};

// Call the displayPokemons function to display the Pokémon cards
displayPokemons();
