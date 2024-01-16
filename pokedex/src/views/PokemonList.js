import React from "react";
import { Link } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";

const PokemonList = () => {
  const { pokemonList, loading } = usePokemon();

  if (loading) {
    return <p>Cargando la lista de Pokémon...</p>;
  }

  return (
    <div className="pokemon-card-container">
      {pokemonList.map((pokemon, index) => (
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
  );
};

export default PokemonList;
