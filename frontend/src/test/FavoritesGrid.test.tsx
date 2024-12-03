import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritesGrid } from '../components/FavoritesGrid';
import { DogBreed } from '@/types/DogBreed';

describe('FavoritesGrid', () => {
  const mockBreeds: Pick<DogBreed, 'id' | 'name' | 'image'>[] = [
    {
      id: '1',
      name: 'Golden Retriever',
      image: 'golden-retriever.jpg',
    },
    {
      id: '2',
      name: 'Labrador Retriever',
      image: 'labrador-retriever.jpg',
    },
    {
      id: '3',
      name: 'Beagle',
      image: 'beagle.jpg',
    },
    {
      id: '4',
      name: 'Bulldog',
      image: 'bulldog.jpg',
    },
    {
      id: '5',
      name: 'Poodle',
      image: 'poodle.jpg',
    },
  ];

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'favorites') {
        return JSON.stringify(mockBreeds);
      }
      return null;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders favorite breeds correctly with id, name, and image only', () => {
    const { container } = render(
      <MemoryRouter>
        <FavoritesGrid />
      </MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
