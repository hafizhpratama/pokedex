import axios from 'axios';
import { LOGIN_API_URL } from '../constants/loginConstants';

const BASE_URL = 'https://pokeapi.co/api/v2';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await axiosInstance.get(`/pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon details');
  }
};

export const fetchPokemons = async (offset: number = 0, limit: number = 20) => {
  try {
    const response = await axiosInstance.get('/pokemon', {
      params: { offset, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon list');
  }
};

export const fetchPokemonTypes = async () => {
  try {
    const response = await axiosInstance.get('/type');
    return response.data.results.map((type: { name: string }) => type.name);
  } catch (error) {
    throw new Error('Failed to fetch Pokémon types');
  }
};

export const fetchPokemonsByType = async (type: string) => {
  try {
    const response = await axiosInstance.get(`/type/${type}`);
    return response.data.pokemon.map(
      (pokemon: { pokemon: { name: string } }) => pokemon.pokemon
    );
  } catch (error) {
    throw new Error('Failed to fetch Pokémon by type');
  }
};

export const fetchPokemonDescription = async (
  pokemonId: number
): Promise<string> => {
  try {
    const response = await axiosInstance.get(`/pokemon-species/${pokemonId}`);
    const englishDescription = response.data.flavor_text_entries.find(
      (entry: { language: { name: string }; flavor_text: string }) =>
        entry.language.name === 'en'
    );
    return englishDescription
      ? englishDescription.flavor_text
      : 'No description available.';
  } catch (error) {
    console.error('Error fetching Pokémon description:', error);
    return 'No description available.';
  }
};

export const fetchPokemonImage = async (id: number): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-form/${id}/`
    );
    const data = await response.json();
    return data.sprites.front_default || null;
  } catch (error) {
    console.error('Error fetching Pokémon image:', error);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { email, password });
    return response.data;
  } catch (err) {
    throw new Error('Login failed. Please try again.');
  }
};
