import React, { useEffect, useState } from 'react';
import { DogBreed } from '../types/DogBreed';
import { getFavorites } from '../utils/favoritesUtils';
import '../style/FavoritesGrid.css';
import Box from '@mui/material/Box';
import '../style/DogCard.css';
import BreedCard from './BreedCard';
import { Link } from 'react-router-dom';

type FavoriteBreed = Pick<DogBreed, 'id' | 'name' | 'image' | 'averageRating'>;

function FavoritesGrid() {
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);

  const updateFavorites = () => {
    const storedFavorites = getFavorites();
    const limitedFavorites = storedFavorites.map(({ id, name, image, averageRating }) => ({
      id,
      name,
      image,
      averageRating,
    }));
    setFavorites(limitedFavorites);
  };

  useEffect(() => {
    updateFavorites();
    window.addEventListener('storage', updateFavorites);
    return () => window.removeEventListener('storage', updateFavorites);
  }, []);

  return (
    <Box>
      <header className="favorites-header">
        <h2>Your favorite dogs:</h2>
      </header>
      <section className="dog-breed-gallery">
        {favorites.length > 0 ? (
          favorites.map((breed) => <BreedCard key={breed.id} breed={breed} />)
        ) : (
          <p>
            Looks like you haven't added any favorites yet.{' '}
            <Link to="/" aria-label="Start exploring breeds">
              Start exploring!
            </Link>
          </p>
        )}
      </section>
    </Box>
  );
}

export { FavoritesGrid };
