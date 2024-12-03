import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DogBreedDetail from '../components/DogBreedDetail';
import { DogBreed, Size } from '../types/DogBreed';
import { describe, it, expect } from 'vitest';

describe('DogBreedDetail Component', () => {
  const mockBreed: DogBreed = {
    id: '1',
    name: 'Golden Retriever',
    description: 'Friendly, intelligent family dog',
    image: 'golden-retriever.jpeg',
    slug: 'golden-retriever',
    favorite: false,
    size: Size.Large,
    weight: 0,
    height: 0,
    lifespan: 0,
    trainability: 0,
    friendliness: 0,
    allergy: 0,
    energy: 0,
    issues: '',
  };

  it('renders the breed name, image, and description', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DogBreedDetail breed={mockBreed} id="1" />
      </MockedProvider>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Golden Retriever');

    const image = screen.getByAltText('Picture of our dog breed: Golden Retriever');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `/images/${mockBreed.image}`);

    expect(screen.getByText('Friendly, intelligent family dog')).toBeInTheDocument();
  });

  it('renders the image with the correct alt text', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <DogBreedDetail breed={mockBreed} id="1" />
      </MockedProvider>,
    );

    const image = screen.getByAltText('Picture of our dog breed: Golden Retriever');
    expect(image).toHaveAttribute('alt', 'Picture of our dog breed: Golden Retriever');
  });
});
