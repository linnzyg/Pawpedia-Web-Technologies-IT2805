
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DogBreedDetailWrapper from './DogBreedDetailWrapper';
import { mockDogBreeds } from '../data/mockDogBreeds';
import { describe, it, expect } from 'vitest';

describe('DogBreedDetailWrapper Component', () => {
  it('renders DogBreedDetail when a valid slug is provided', () => {
    const validSlug = mockDogBreeds[0].slug;

    render(
      <MemoryRouter initialEntries={[`/${validSlug}`]}>
        <Routes>
          <Route path="/:slug" element={<DogBreedDetailWrapper />} />
        </Routes>
      </MemoryRouter>
    );

   
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(mockDogBreeds[0].name);
  });

  it('renders "Breed not found" when an invalid slug is provided', () => {
    const invalidSlug = 'non-existent-breed';

    render(
      <MemoryRouter initialEntries={[`/${invalidSlug}`]}>
        <Routes>
          <Route path="/:slug" element={<DogBreedDetailWrapper />} />
        </Routes>
      </MemoryRouter>
    );

    
    expect(screen.getByText('Breed not found')).toBeInTheDocument();
  });

  it('renders "Breed not found" when slug is missing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<DogBreedDetailWrapper />} />
        </Routes>
      </MemoryRouter>
    );

   
    expect(screen.getByText('Breed not found')).toBeInTheDocument();
  });
});
