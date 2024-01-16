import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import SearchBar from "../components/SearchBar";
import Sort from "../components/Sort";

const PokemonList = () => {
  const { pokemonList, loading } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(null);

  if (loading) {
    return <p>Cargando la lista de Pokémon...</p>;
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
            key={pokemon.id}
            to={`/pokemon/${pokemon.originalIndex}`}
            className="pokemon-card-link"
          >
            <div className="pokemon-card">
              <div className="pokemon-id">#{pokemon.originalIndex}</div>
              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="pokemon-image"
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
