import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
      <Link to="/">Volver a la Pokédex</Link>
      <h2>{pokemon.name}</h2>
      <img
        src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
        alt={pokemon.name}
      />

      <div>
        <h3>Base Experience: {pokemon.base_experience}</h3>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>

        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>

        <h3>Types:</h3>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>

        <h3>Movements:</h3>
        <ul>
          {pokemon.moves.map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>

        <h3>Stats:</h3>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
