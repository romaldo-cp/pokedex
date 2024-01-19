import { useState, useEffect } from "react";
import api from "../services/api";

const usePokemonDetail = (url) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typeColors, setTypeColors] = useState({});

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);

        const response = await api.get(url);

        setPokemonDetail(response.data);
        fetchTypeColors(); 
      } catch (error) {
        console.error("Error fetching Pokémon detail:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTypeColors = async () => {
      try {
        const typeResponse = await api.get("type");
        const colors = {};

        
        typeResponse.data.results.forEach((type) => {
          switch (type.name) {
            case "grass":
              colors[type.name] = "#74CB48";
              break;
            case "poison":
              colors[type.name] = "#A43E9E";
              break;
            case "fire":
              colors[type.name] = "#F57D31";
              break;
            case "water":
              colors[type.name] = "#6493EB";
              break;
            case "bug":
              colors[type.name] = "#A7B723";
              break;
            case "flying":
              colors[type.name] = "#A891EC";
              break;
            case "electric":
              colors[type.name] = "#F9CF30";
              break;
            case "ghost":
              colors[type.name] = "#70559B";
              break;
            case "normal":
              colors[type.name] = "#AAA67F";
              break;
            case "psychic":
              colors[type.name] = "#FB5584";
              break;
            case "steel":
              colors[type.name] = "#B7B9D0";
              break;
            case "rock":
              colors[type.name] = "#B69E31";
              break;
            default:
              colors[type.name] = "#CCCCCC"; 
          }
        });

        setTypeColors(colors);
      } catch (error) {
        console.error("Error fetching type colors:", error);
      }
    };

    if (url) {
      fetchPokemonDetail();
    }
  }, [url]);

  return { pokemonDetail, loading, typeColors };
};

export default usePokemonDetail;
