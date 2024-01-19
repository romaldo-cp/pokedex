import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import usePokemonDetail from "../hooks/usePokemonDetail";

const PokemonDetail = () => {
  const pokeballImage = require("../assets/img/Pokeball.svg").default;
  const weightImage = require("../assets/img/weight.svg").default;
  const heightImage = require("../assets/img/height.svg").default;
  const { id } = useParams();
  const { pokemonDetail, loading, typeColors } = usePokemonDetail(
    `pokemon/${id}`
  );
  const [bodyBackgroundColor, setBodyBackgroundColor] = useState("#CCCCCC");

  useEffect(() => {
    if (
      pokemonDetail &&
      pokemonDetail.types &&
      pokemonDetail.types.length > 0
    ) {
      const primaryTypeName = pokemonDetail.types[0].type.name;
      const primaryTypeColor = typeColors[primaryTypeName] || "#CCCCCC";
      setBodyBackgroundColor(primaryTypeColor);
      document.body.style.backgroundColor = primaryTypeColor;
    }
  }, [pokemonDetail, typeColors]);

  if (loading || !pokemonDetail) {
    return <p>Cargando detalles del Pokémon...</p>;
  }

  function addCommaBeforeLastDigit(number) {
    const numberString = number.toString();

    if (numberString.length === 1) {
      return numberString;
    }

    const lastDigitIndex = numberString.length - 1;

    return (
      numberString.slice(0, lastDigitIndex) +
      "," +
      numberString.slice(lastDigitIndex)
    );
  }

  const previousId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;
  const progressBarColor = bodyBackgroundColor || "#CCCCCC";
  return (
    <div className="pokemon-detail-container">
      <img
        src={pokeballImage}
        className="pokeball-image"
        alt="Pokeball"
        loading="lazy"
      />
      <div className="pokemon-title-container">
        <h2 className="pokemon-title">
          <Link to={`/`}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          {pokemonDetail.name.toUpperCase()}
        </h2>
        <h2># {pokemonDetail.id.toString().padStart(3, "0")}</h2>
      </div>
      <div className="navigation-container">
        <div>
          {previousId > 0 && (
            <Link className="navigation" to={`/pokemon/${previousId}`}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          )}
        </div>
        <div className="image-container">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt={pokemonDetail.name}
            className="pokemon-image"
            loading="lazy"
          />
        </div>

        <div>
          {nextId <= 898 && (
            <Link className="navigation" to={`/pokemon/${nextId}`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          )}
        </div>
      </div>

      <div className="info-container">
        <div className="types-container">
          {pokemonDetail.types.map((type) => (
            <div
              key={type.type.name}
              className="type"
              style={{
                backgroundColor: typeColors[type.type.name] || "#CCCCCC",
              }}
            >
              {type.type.name}
            </div>
          ))}
        </div>

        <h2
          className="about-text"
          style={{
            color: bodyBackgroundColor,
          }}
        >
          About
        </h2>
        {pokemonDetail && pokemonDetail.types && (
          <div className="info-box">
            <p>
              <img
                src={weightImage}
                className="info-image"
                alt="Weight"
                loading="lazy"
              />
              {addCommaBeforeLastDigit(pokemonDetail.weight)} kg
              <br />
              <span className="info-title">Weight</span>
            </p>

            <p>
              <img
                src={heightImage}
                className="info-image"
                alt="Height"
                loading="lazy"
              />
              {addCommaBeforeLastDigit(pokemonDetail.height)} m
              <br />
              <span className="info-title">Height</span>
            </p>
            <p>
              {pokemonDetail.moves
                .slice(0, 3)
                .map((move) => move.move.name)
                .join(", ")}
              <br />
              <span className="info-title">Moves</span>
            </p>
          </div>
        )}
        <div className="stats-container">
          {pokemonDetail.stats.map((stat) => (
            <div key={stat.stat.number} className="stat-item">
              <div className="stat-name">{stat.stat.name}</div>
              <div className="stat-number">{stat.base_stat}</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.max((stat.base_stat / 255) * 100, 5)}%`,
                    backgroundColor: progressBarColor,
                  }}
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
