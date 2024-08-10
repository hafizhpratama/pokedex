import create from "zustand";
import { Pokemon } from "../types/pokemon";

interface PokemonState {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  setPokemons: (pokemons: Pokemon[]) => void;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
  pokemons: [],
  selectedPokemon: null,
  setPokemons: (pokemons) => set({ pokemons }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));
