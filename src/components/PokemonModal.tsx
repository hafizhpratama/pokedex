import React, { useEffect, useState, useCallback, useMemo } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { statColors, typeColors } from "../constants/typeColors";
import { fetchPokemonDescription } from "../services/pokeApi";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: {
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
  } | null;
}

const PokemonModal: React.FC<PokemonModalProps> = React.memo(
  ({ isOpen, onClose, pokemon }) => {
    const [description, setDescription] = useState<string>("");
    const [isLoadingDescription, setIsLoadingDescription] =
      useState<boolean>(true);
    const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

    useEffect(() => {
      if (pokemon) {
        const fetchDescription = async () => {
          setIsLoadingDescription(true);
          const desc = await fetchPokemonDescription(pokemon.id);
          setDescription(desc);
          setIsLoadingDescription(false);
        };

        fetchDescription();
      }
    }, [pokemon]);

    const formatText = useCallback((text: string) => {
      return text.replace(/-/g, " ").toUpperCase();
    }, []);

    const getStatBackgroundColor = useCallback((key: string) => {
      return statColors[key] || "#A0A0A0";
    }, []);

    const getProgressBarWidth = useCallback((value: number) => {
      const minWidth = 10;
      const maxWidth = 100;
      const scaledWidth = Math.min((value / 200) * 100, maxWidth);
      return `${Math.max(scaledWidth, minWidth)}%`;
    }, []);

    const typeBadges = useMemo(
      () =>
        pokemon?.type.map((type) => (
          <span
            key={type}
            className="px-4 py-2 rounded-full text-white font-semibold text-sm shadow-lg"
            style={{ backgroundColor: typeColors[type] || "#A0A0A0" }}
          >
            {formatText(type)}
          </span>
        )),
      [pokemon, formatText]
    );

    const overlayColor = useMemo(() => {
      return pokemon?.type.length
        ? typeColors[pokemon.type[0]] || "#000000"
        : "#000000";
    }, [pokemon]);

    if (!isOpen || !pokemon) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
        <div
          className="fixed inset-0"
          style={{ backgroundColor: overlayColor, opacity: 0.7 }}
          onClick={onClose}
        ></div>
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-4 my-6 max-h-screen overflow-y-auto border border-gray-300">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white bg-red-600 hover:bg-red-700 rounded-full shadow-md text-2xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex flex-col items-center mb-6">
            {isLoadingImage && <LoadingSpinner />}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              className={`w-32 h-32 rounded-full border-4 border-yellow-500 shadow-md transition-opacity duration-300 ${
                isLoadingImage ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoadingImage(false)}
            />
            <h2 className="text-3xl font-bold text-blue-600 mt-4 mb-2">
              {formatText(pokemon.name.toUpperCase())}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 p-4 bg-purple-100 rounded-lg shadow-md mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                BASE STATS
              </h3>
              <div className="space-y-4">
                {Object.entries(pokemon.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-2 gap-2 items-center"
                  >
                    <div className="col-span-1 font-semibold  text-purple-800 text-sm">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </div>
                    <div className="col-span-2 relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full`}
                        style={{
                          backgroundColor: getStatBackgroundColor(key),
                          width: getProgressBarWidth(value),
                        }}
                      />
                      <span className="absolute right-0 top-0 h-full flex items-center pr-2 text-xs font-semibold text-white">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  TYPES
                </h3>
                <div className="flex flex-wrap gap-2">{typeBadges}</div>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold text-pink-800 mb-2">
                  ABILITIES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability}
                      className="px-4 py-2 rounded-full bg-pink-400 text-white font-semibold text-sm shadow-lg"
                    >
                      {formatText(ability)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-teal-100 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-xl font-semibold text-teal-800 mb-2">
                  DETAILS
                </h3>
                <div className="flex flex-wrap gap-2 text-teal-800">
                  <span className="px-4 py-2 rounded-full bg-teal-400 text-white font-semibold text-sm shadow-lg">
                    #{pokemon.id}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-teal-400 text-white font-semibold text-sm shadow-lg">
                    {pokemon.height / 10} M
                  </span>
                  <span className="px-4 py-2 rounded-full bg-teal-400 text-white font-semibold text-sm shadow-lg">
                    {pokemon.weight / 10} KG
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  DESCRIPTION
                </h3>
                <p className="text-blue-800">{description}</p>
                {isLoadingDescription && <LoadingSpinner />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PokemonModal;
