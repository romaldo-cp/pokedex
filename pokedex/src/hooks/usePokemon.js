import { useState, useEffect } from "react";
import api from "../services/api";

const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);

        const response = await api.get("pokemon", {
          params: {
            limit: 1000,
          },
        });

        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return { pokemonList, loading };
};

export default usePokemon;
