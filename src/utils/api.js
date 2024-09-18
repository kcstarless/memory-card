// utils/api.js
export const fetchPokemonData = async () => {
    try {
        // Check if data is available in session storage
        const cachedData = sessionStorage.getItem('pokemonData');
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118");
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const data = await response.json();

        // Extract Pokemon URLs
        const pokemonUrls = data.results;

        // Shuffle the list and get the first 20
        const shuffled = pokemonUrls.sort(() => 0.5 - Math.random());
        const selectedPokemon = shuffled.slice(0, 20);

        // Fetch details for each of the selected pokemons
        const detailedPokemonPromises = selectedPokemon.map((pokemon) =>
            fetch(pokemon.url).then((response) => response.json())
        );

        const detailedPokemon = await Promise.all(detailedPokemonPromises);
        const pokemonWithClickedState = detailedPokemon.map(pokemon => ({
            ...pokemon,
            clicked: false // Add `clicked` state here
        }));

        // Cache the detailedPokemon data in session storage
        sessionStorage.setItem('pokemonData', JSON.stringify(pokemonWithClickedState));

        return pokemonWithClickedState;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        throw error;
    }
};

