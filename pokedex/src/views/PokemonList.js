import React from 'react';
import usePokemon from '../hooks/usePokemon';

const PokemonList = () => {
  const { pokemonList, loading } = usePokemon();

  if (loading) {
    return <p>Cargando la lista de Pokémon...</p>;
  }

  return (
    <div>
      <h2>Lista de Pokémon</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;