import { useState, useEffect } from 'react';
import api from '../services/api';

const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);

        // Obtener los primeros 151 Pokémon
        const response = await api.get('pokemon', {
          params: {
            limit: 151,
          },
        });

        // Almacenar la lista de Pokémon en el estado local
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  return { pokemonList, loading };
};

export default usePokemon;
