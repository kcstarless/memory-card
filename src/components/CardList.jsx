import React, { useState, useEffect } from "react";
import { fetchPokemonData } from "../utils/api";

const Cardlist = ({ score, setScore }) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndSetPokemonData = async () => {
            try {
                const data = await fetchPokemonData();
                setTimeout(() => {
                    setPokemonData(data);
                    setLoading(false);
                }, 500);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAndSetPokemonData();
    }, []);

    if (error) return <p>{error}</p>;

    const handleOnClick = (id) => {
        const pokemon = pokemonData.find(pokemon => pokemon.id === id);

        if (pokemon.clicked) {
            resetAllClicked();
            setScore(0);
        } else {
            setScore(score + 1);
            const updatedData = pokemonData.map(pokemon =>
                pokemon.id === id ? { ...pokemon, clicked: true } : pokemon
            );
            setPokemonData(shuffleArray(updatedData));
        }
    };

    const resetAllClicked = () => {
        const resetData = pokemonData.map(pokemon => ({ ...pokemon, clicked: false }));
        setPokemonData(shuffleArray(resetData));
    };

    const shuffleArray = (array) => {
        return [...array].sort(() => 0.5 - Math.random());
    };

    return (
        <div className="card-list">
            {loading ? (
                Array.from({ length: 20 }).map((_, index) => ( // Fallback to 12 if data is not loaded
                    <div className="card" key={index}>
                        <div className="loading-spinner"></div>
                    </div>
                ))
            ) : (
                pokemonData.map((pokemon) => (
                    <div className="card" key={pokemon.id} onClick={() => handleOnClick(pokemon.id)}>
                        <img
                            src={pokemon.sprites?.other['official-artwork'].front_default}
                            alt={pokemon.name}
                        />
                        <div className="card__title">{pokemon.name}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cardlist;
