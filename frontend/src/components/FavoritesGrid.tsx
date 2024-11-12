import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DogBreed } from '../types/DogBreed';
import '../style/FavoritesGrid.css';

type FavoriteBreed = Pick<DogBreed, 'id' | 'name' | 'image'>;

function FavoritesGrid() {
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);

  const updateFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const parsedFavorites: DogBreed[] = JSON.parse(storedFavorites);
      const limitedFavorites = parsedFavorites.map(({ id, name, image }) => ({ id, name, image }));
      setFavorites(limitedFavorites);
    }
  };

  useEffect(() => {
    updateFavorites();
    window.addEventListener('storage', updateFavorites);
    return () => window.removeEventListener('storage', updateFavorites);
  }, []);

  return (
    <div className="favorites-grid">
      <h1>Your favorite breeds</h1>
      {favorites.length > 0 ? (
        favorites.map((breed) => (
          <div key={breed.id} className="breed-card">
            <Link to={`/${breed.id}`}>
              <h2>{breed.name}</h2>
              <img src={`/images/${breed.image}`} alt={`Picture of ${breed.name}`} />
            </Link>
          </div>
        ))
      ) : (
        <p>No breeds found.</p>
      )}
    </div>
  );
}

export { FavoritesGrid };
