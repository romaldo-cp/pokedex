import React from 'react';
import usePokemon from '../hooks/usePokemon';

const PokemonDetails = ({ pokemonName }) => {
  const { pokemon, loading } = usePokemon(pokemonName);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!pokemon) {
    return <p>Error al cargar el Pokémon.</p>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {/* Agrega más detalles según la estructura de datos de la API */}
    </div>
  );
};

export default PokemonDetails;
