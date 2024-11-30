import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DogBreed } from '../types/DogBreed';
import { getFavorites } from '../utils/favoritesUtils';
import '../style/FavoritesGrid.css';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import '../style/DogCard.css';

type FavoriteBreed = Pick<DogBreed, 'id' | 'name' | 'image'>;

function FavoritesGrid() {
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);

  const updateFavorites = () => {
    const storedFavorites = getFavorites();
    const limitedFavorites = storedFavorites.map(({ id, name, image }) => ({ id, name, image }));
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
      <Box className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map((breed) => (
            <Card key={breed.id} className="breed-card">
              <Link to={`/${breed.id}`}>
                <h2>{breed.name}</h2>
                <img src={`/images/${breed.image}`} alt={`Picture of ${breed.name}`} />
              </Link>
            </Card>
          ))
        ) : (
          <p>No breeds found.</p>
        )}
      </Box>
    </Box>
  );
}

export { FavoritesGrid };
