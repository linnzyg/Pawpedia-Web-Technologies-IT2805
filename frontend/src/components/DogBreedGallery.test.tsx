
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DogBreedGallery from './DogBreedGallery';
import { mockDogBreeds } from '../data/mockDogBreeds';
import { describe, it, expect } from 'vitest';


describe('DogBreedGallery Component', () => {
  it('renders the correct number of breed cards', () => {
    render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>
    );

    const breedCards = screen.getAllByRole('heading', { level: 2 });
    expect(breedCards).toHaveLength(mockDogBreeds.length);
  });

  it('displays breed names and images correctly', () => {
    render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>
    );

    mockDogBreeds.forEach((breed) => {
     
      expect(screen.getByText(breed.name)).toBeInTheDocument();

   
      const image = screen.getByAltText(breed.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', breed.imageUrl);
    });
  });

  it('has links with correct href attributes corresponding to breed slugs', () => {
    render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>
    );

    mockDogBreeds.forEach((breed) => {
      const image = screen.getByAltText(breed.name);
      const link = image.closest('a');
      expect(link).toHaveAttribute('href', `/${breed.slug}`);
    });
  });
});
