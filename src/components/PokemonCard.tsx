import React, { useState, useCallback, useMemo } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { typeColors } from "../constants/typeColors";

interface PokemonCardProps {
  name: string;
  id: number;
  types: string[];
  onClick: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = React.memo(
  ({ name, id, types, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = useCallback(() => {
      setIsLoading(false);
    }, []);

    const handleImageError = useCallback(() => {
      setIsLoading(false);
    }, []);

    const formattedName = useMemo(
      () => name.toUpperCase().replace(/-/g, " "),
      [name]
    );
    const formattedId = useMemo(() => id.toString().padStart(3, "0"), [id]);

    const primaryType = types[0];
    const backgroundColor = typeColors[primaryType] || "#B0B0B0";

    return (
      <div
        className="relative border rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
        style={{ backgroundColor }}
        onClick={() => onClick(id)}
      >
        <div className="p-4 flex flex-col items-center">
          {isLoading && <LoadingSpinner />}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
            className={`w-32 h-32 object-cover mb-4 rounded-full border-4 border-yellow-300 shadow-md transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="text-2xl font-bold text-gray-800 mb-2 text-center">
            {formattedName}
          </div>
          <div className="text-lg font-semibold text-blue-500 bg-white px-4 py-2 rounded-full shadow-md border border-blue-500">
            #{formattedId}
          </div>
          <div className="flex flex-wrap mt-2">
            {types.length > 0 ? (
              types.map((type) => (
                <span
                  key={type}
                  className="inline-block mx-1 mb-1 px-3 py-1 rounded-full text-white font-medium"
                  style={{ backgroundColor: typeColors[type] || "#B0B0B0" }}
                >
                  {type.toUpperCase()}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No Types</span>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-2 bg-yellow-200 text-yellow-800 text-xs rounded-tl-lg shadow-md">
          Pokémon
        </div>
      </div>
    );
  }
);

export default PokemonCard;
