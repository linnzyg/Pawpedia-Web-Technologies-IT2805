import { DogBreed } from '../types/DogBreed';

export const getFavorites = (): DogBreed[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = (id: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav: DogBreed) => fav.id === id);
};

export const addFavorite = (breed: Pick<DogBreed, 'id' | 'name' | 'image' | 'averageRating'>): void => {
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, breed];
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const removeFavorite = (id: string): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav: { id: string }) => fav.id !== id);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const toggleFavorite = (
  id: string,
  breed?: Pick<DogBreed, 'id' | 'name' | 'image' | 'averageRating'>,
): boolean => {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false; // Not a favorite anymore
  } else if (breed) {
    addFavorite(breed);
    return true; // Now marked as favorite
  }
  return false; // Return current state if no breed data provided
};
