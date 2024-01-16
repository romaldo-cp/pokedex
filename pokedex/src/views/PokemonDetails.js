import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await api.get(`pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (!pokemon) {
    return <p>Cargando detalles del Pokémon...</p>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img
        src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
        alt={pokemon.name}
      />
    </div>
  );
};

export default PokemonDetail;
