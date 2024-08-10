import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  fetchPokemonDetails,
  fetchPokemons,
  fetchPokemonsByType,
  fetchPokemonTypes,
} from '../services/pokeApi';
import PokemonModal from '../components/PokemonModal';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonCard from '../components/PokemonCard';
import { typeColors } from '../constants/typeColors';
import {
  Pokemon,
  PokemonDetails,
  StatDetail,
  TypeDetail,
  AbilityDetail,
  Stats,
} from '../types/pokemon';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const { pokemons, setPokemons } = usePokemonStore();
  const [loading, setLoading] = useState(true);
  const [loadingPokemons, setLoadingPokemons] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'all'
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
    total: 0,
    currentPage: 1,
  });
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const types: string[] = await fetchPokemonTypes();
        setCategories(['all', ...types.filter((type) => type !== 'unknown')]);
      } catch (error) {
        console.error('Failed to load categories', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadPokemons = async () => {
      setLoadingPokemons(true);
      try {
        let data: { name: string }[] = [];
        if (selectedCategory === 'all') {
          const { results, count } = await fetchPokemons(
            pagination.offset,
            pagination.limit
          );
          setPagination((prev) => ({ ...prev, total: count }));
          data = results;
        } else if (selectedCategory) {
          const pokemonsByType = await fetchPokemonsByType(selectedCategory);
          setPagination((prev) => ({ ...prev, total: pokemonsByType.length }));
          data = pokemonsByType.slice(
            pagination.offset,
            pagination.offset + pagination.limit
          );
        }

        const detailedData: Pokemon[] = await Promise.all(
          data.map(async (pokemon) => {
            const details: PokemonDetails = await fetchPokemonDetails(
              pokemon.name
            );
            const stats: Stats = details.stats.reduce(
              (acc: Stats, stat: StatDetail) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc;
              },
              {} as Stats
            );

            return {
              ...pokemon,
              id: details.id,
              type: details.types.map((type: TypeDetail) => type.type.name),
              height: details.height,
              weight: details.weight,
              abilities: details.abilities.map(
                (ability: AbilityDetail) => ability.ability.name
              ),
              stats,
            };
          })
        );
        setPokemons(detailedData);
      } catch (error) {
        console.error('Failed to load Pokémon data', error);
      } finally {
        setLoadingPokemons(false);
      }
    };

    loadPokemons();
  }, [selectedCategory, pagination.offset, pagination.limit, setPokemons]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      offset: (prev.currentPage - 1) * prev.limit,
    }));
  }, [pagination.currentPage]);

  const totalPages = useMemo(
    () => Math.ceil(pagination.total / pagination.limit),
    [pagination.total, pagination.limit]
  );

  const getPaginationRange = useCallback(
    (currentPage: number, totalPages: number) => {
      const range = [];
      const left = Math.max(1, currentPage - 2);
      const right = Math.min(totalPages, currentPage + 2);

      if (left > 1) {
        range.push(1);
        if (left > 2) range.push('...');
      }

      for (let i = left; i <= right; i++) {
        range.push(i);
      }

      if (right < totalPages) {
        if (right < totalPages - 1) range.push('...');
        range.push(totalPages);
      }

      return range;
    },
    []
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setPagination((prev) => ({ ...prev, currentPage: page }));
      }
    },
    [totalPages]
  );

  const handleCardClick = useCallback(
    (id: number) => {
      const pokemon = pokemons.find((p) => p.id === id);
      if (pokemon) {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
      }
    },
    [pokemons]
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="relative p-4 min-h-screen bg-[url('https://example.com/background-pattern.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100 opacity-80"></div>
      <div className="relative z-10 p-4">
        <div className="flex justify-center mb-12">
          <img
            src="https://i.ebayimg.com/images/g/7GoAAOSwuWpdmJCJ/s-l400.webp"
            alt="Pokédex Logo"
            className="w-64 h-auto"
          />
        </div>
        <div className="container mx-auto mb-8">
          <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="px-6 py-2 rounded-full text-white font-semibold transition-transform transform hover:scale-105"
                style={{ backgroundColor: typeColors[category] || '#B0B0B0' }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="container mx-auto">
            {loadingPokemons ? (
              <LoadingSpinner />
            ) : (
              <>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {pokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      name={pokemon.name}
                      id={pokemon.id}
                      types={pokemon.type}
                      onClick={handleCardClick}
                    />
                  ))}
                </ul>
                <div className="flex flex-col items-center gap-4 mt-10">
                  <div className="py-4 px-6 bg-white border border-red-600 rounded-lg shadow-sm">
                    <span className="text-lg font-semibold text-black">
                      Showing {pagination.offset + 1} -{' '}
                      <span className="text-red-600 font-bold">
                        {Math.min(
                          pagination.offset + pagination.limit,
                          pagination.total
                        )}
                      </span>{' '}
                      of{' '}
                      <span className="text-red-700 font-bold">
                        {pagination.total}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage - 1)
                      }
                      disabled={pagination.currentPage === 1}
                      className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                      Previous
                    </button>
                    {getPaginationRange(pagination.currentPage, totalPages).map(
                      (page, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(Number(page))}
                          className={`px-4 py-2 rounded-md ${
                            typeof page === 'number' &&
                            page === pagination.currentPage
                              ? 'bg-red-700 text-white'
                              : 'bg-white text-red-600'
                          } border border-red-600 transition-colors hover:bg-red-100`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage + 1)
                      }
                      disabled={pagination.currentPage === totalPages}
                      className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <PokemonModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      </div>
    </div>
  );
};

export default HomePage;
