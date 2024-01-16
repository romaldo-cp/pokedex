import { useState, useEffect } from "react";
import api from "../services/api";

const usePokemonDetail = (url) => {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);

        const response = await api.get(url);

        setPokemonDetail(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPokemonDetail();
    }
  }, [url]);

  return { pokemonDetail, loading };
};

export default usePokemonDetail;
