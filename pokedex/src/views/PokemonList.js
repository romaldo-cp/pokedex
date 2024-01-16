import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import SearchBar from "../components/SearchBar";

const PokemonList = () => {
  const { pokemonList, loading } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <p>Cargando la lista de Pokémon...</p>;
  }

   const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      <SearchBar setSearchTerm={setSearchTerm} />

      <div className="pokemon-card-container">
        {filteredPokemonList.map((pokemon, index) => (
          <Link
            key={index}
            to={`/pokemon/${index + 1}`}
            className="pokemon-card-link"
          >
            <div className="pokemon-card">
              <div className="pokemon-number">#{index + 1}</div>

              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${
                  index + 1
                }.png`}
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
