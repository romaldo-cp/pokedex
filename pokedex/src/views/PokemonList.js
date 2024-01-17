import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";
import PokeballImage from "../assets/img/Pokeball.svg";

const PokemonList = () => {
  const { pokemonList, loading } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);

  if (loading) {
    return (
      <div className="spinner-container">
        <img src={PokeballImage} alt="Pokeball Spinner" className="spinner" />
        <span>Cargando la lista de Pokémon...</span>
      </div>
    );
  }

  const numberedPokemonList = pokemonList.map((pokemon, originalIndex) => ({
    ...pokemon,
    originalIndex: originalIndex + 1,
  }));

  const filteredAndSortedPokemonList = numberedPokemonList
    .filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.originalIndex.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortOption === "originalIndex") {
        return a.originalIndex - b.originalIndex;
      } else if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return 0;
      }
    });

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <div className="filter-list">
        <SearchBar setSearchTerm={setSearchTerm} />
        <Sort onSortChange={handleSortChange} />
      </div>

      <div className="pokemon-card-container">
        {filteredAndSortedPokemonList.map((pokemon) => (
          <Link
            key={pokemon.name}
            to={`/pokemon/${pokemon.originalIndex}`}
            className="pokemon-card-link"
          >
            <div className="pokemon-card">
              <div className="pokemon-id">#{pokemon.originalIndex}</div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.originalIndex}.png`}
                alt={pokemon.name}
                className="pokemon-image"
                loading="lazy"
              />
              <div className="pokemon-name">{pokemon.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
