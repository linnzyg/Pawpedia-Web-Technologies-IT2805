import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getFavorites, isFavorite, addFavorite, removeFavorite, toggleFavorite } from '../utils/favoritesUtils';
import { DogBreed } from '../types/DogBreed';

describe('favoritesUtils', () => {
  const mockBreed: Pick<DogBreed, 'id' | 'name' | 'image'> = {
    id: '1',
    name: 'Golden Retriever',
    image: 'golden-retriever.jpg',
  };

  const anotherMockBreed: Pick<DogBreed, 'id' | 'name' | 'image'> = {
    id: '2',
    name: 'Labrador Retriever',
    image: 'labrador-retriever.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getFavorites: should return an empty array if no favorites exist', () => {
    expect(getFavorites()).toMatchSnapshot();
  });

  it('getFavorites: should return the correct list of favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockBreed]));
    expect(getFavorites()).toMatchSnapshot();
  });

  it('isFavorite: should return false for a non-favorited id', () => {
    localStorage.setItem('favorites', JSON.stringify([mockBreed]));
    expect(isFavorite('2')).toMatchSnapshot();
  });

  it('isFavorite: should return true for a favorited id', () => {
    localStorage.setItem('favorites', JSON.stringify([mockBreed]));
    expect(isFavorite('1')).toMatchSnapshot();
  });

  it('addFavorite: should add a new breed to favorites', () => {
    addFavorite(mockBreed);
    expect(getFavorites()).toMatchSnapshot();
  });

  it('removeFavorite: should remove a breed from favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockBreed, anotherMockBreed]));
    removeFavorite('1');
    expect(getFavorites()).toMatchSnapshot();
  });

  it('toggleFavorite: should add to favorites if not already favorited', () => {
    toggleFavorite('1', mockBreed);
    expect(getFavorites()).toMatchSnapshot();
  });

  it('toggleFavorite: should remove from favorites if already favorited', () => {
    localStorage.setItem('favorites', JSON.stringify([mockBreed]));
    toggleFavorite('1');
    expect(getFavorites()).toMatchSnapshot();
  });
});
