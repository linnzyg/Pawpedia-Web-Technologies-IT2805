import React from 'react';
import { render, screen } from '@testing-library/react';
import DogBreedDetail from './DogBreedDetail';
import { DogBreed, Size } from '../types/DogBreed';
import { describe, it, expect } from 'vitest';

describe('DogBreedDetail Component', () => {
  const mockBreed: DogBreed = {
    id: 1,
    name: 'Golden Retriever',
    description: 'Friendly, intelligent family dog',
    imageUrl: '/assets/golden-retriever.jpeg',
    slug: 'golden-retriever',
    favorite: false,
    size: Size.Large,
  };

  it('renders the breed name, image, and description', () => {
    render(<DogBreedDetail breed={mockBreed} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Golden Retriever');

    const image = screen.getByAltText('Golden Retriever');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockBreed.imageUrl);

    expect(screen.getByText('Friendly, intelligent family dog')).toBeInTheDocument();
  });

  it('has the correct slug property', () => {
    expect(mockBreed.slug).toBe('golden-retriever');
  });

  it('image has correct alt text', () => {
    render(<DogBreedDetail breed={mockBreed} />);

    const image = screen.getByAltText('Golden Retriever');
    expect(image).toHaveAttribute('alt', 'Golden Retriever');
  });
});
