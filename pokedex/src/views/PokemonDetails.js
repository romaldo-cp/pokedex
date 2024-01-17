import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
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

  const previousId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;

  return (
    <div className="pokemon-detail-container">
      <div className="center-container">
        <h2 className="pokemon-title">
          <Link to={`/`}>
          <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
          {pokemon.name.toUpperCase()}
        </h2>
      </div>
      <div className="navigation">
        {previousId > 0 && (
          <Link to={`/pokemon/${previousId}`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        )}
      </div>
      <div className="image-container">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={pokemon.name}
          className="pokemon-image"
          loading="lazy"
        />
      </div>

      <div className="navigation">
        {nextId <= 898 && (
          <Link to={`/pokemon/${nextId}`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </div>

      <div className="info-container">
        <div className="info-box">
          <p>Weight: {pokemon.weight}</p>
          <p>Height: {pokemon.height}</p>
          <p>
            Movements:{" "}
            {pokemon.moves
              .slice(0, 3)
              .map((move) => move.move.name)
              .join(", ")}
          </p>
        </div>
        <div className="stats-container">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat-item">
              <div className="stat-name">{stat.stat.name}</div>
              <div className="stat-number">{stat.base_stat}</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
