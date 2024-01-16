import React from "react";
import { useParams } from "react-router-dom";
import usePokemonDetail from "../hooks/usePokemonDetail";

const PokemonDetail = () => {
  const { id } = useParams();
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const { pokemonDetail, loading } = usePokemonDetail(apiUrl);

  if (loading) {
    return <p>Cargando detalles del Pokémon...</p>;
  }

  if (!pokemonDetail) {
    return <p>No se encontraron detalles para este Pokémon.</p>;
  }

  return (
    <div>
      <h2>{pokemonDetail.name}</h2>
      <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
    </div>
  );
};

export default PokemonDetail;
