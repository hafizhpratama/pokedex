import create from 'zustand';

interface PokemonState {
  pokemons: any[];
  selectedPokemon: any | null;
  setPokemons: (pokemons: any[]) => void;
  setSelectedPokemon: (pokemon: any | null) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
  pokemons: [],
  selectedPokemon: null,
  setPokemons: (pokemons) => set({ pokemons }),
  setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
}));
