export interface Pokemon {
  name: string;
  id: number;
  type: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface TypeDetail {
  type: {
    name: string;
  };
}

export interface AbilityDetail {
  ability: {
    name: string;
  };
}

export interface StatDetail {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface PokemonDetails {
  id: number;
  types: TypeDetail[];
  height: number;
  weight: number;
  abilities: AbilityDetail[];
  stats: StatDetail[];
}

export interface PokemonType {
  name: string;
}

export interface PokemonTypeResponse {
  pokemon: { pokemon: { name: string } }[];
}

export interface PokemonSpeciesResponse {
  flavor_text_entries: { language: { name: string }; flavor_text: string }[];
}

export interface Stats {
  [key: string]: number;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
