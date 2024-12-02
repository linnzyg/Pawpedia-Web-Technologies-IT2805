import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DogBreed } from '../types/DogBreed';
import '../style/FavoritesGrid.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import '../style/DogCard.css';
import DogCard from './DogCard';

type FavoriteBreed = Pick<DogBreed, 'id' | 'name' | 'image' | 'averageRating'>;

function FavoritesGrid() {
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);

  const updateFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const parsedFavorites: DogBreed[] = JSON.parse(storedFavorites);
      const limitedFavorites = parsedFavorites.map(({ id, name, image, averageRating }) => ({
        id,
        name,
        image,
        averageRating,
      }));
      setFavorites(limitedFavorites);
    }
  };

  useEffect(() => {
    updateFavorites();
    window.addEventListener('storage', updateFavorites);
    return () => window.removeEventListener('storage', updateFavorites);
  }, []);

  return (
    <Box>
      <header className="favorites-header">
        <h2>Your favorite dogs: </h2>
      </header>
      <Box className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map((breed) => <DogCard key={breed.id} breed={breed} />)
        ) : (
          <p>No breeds found.</p>
        )}
      </Box>
    </Box>
  );
}

export { FavoritesGrid };
