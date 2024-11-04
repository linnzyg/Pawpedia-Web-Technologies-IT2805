import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DogBreedDetailWrapper from './DogBreedDetailWrapper';
import { mockDogBreeds } from '../data/mockDogBreeds';
import { describe, it, expect } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { GET_BREED } from '../api/queries';

const mocks = [
  {
    request: {
      query: GET_BREED,
      variables: {
        id: mockDogBreeds[0].id,
      },
    },
    result: {
      data: {
        breed: mockDogBreeds[0],
      },
    },
  },
  {
    request: {
      query: GET_BREED,
      variables: {
        id: 'non-existent-id',
      },
    },
    result: {
      data: {
        breed: null,
      },
    },
  },
];

describe('DogBreedDetailWrapper Component', () => {
  it('renders DogBreedDetail when a valid slug is provided', async () => {
    const validSlug = mockDogBreeds[0].slug;

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/${validSlug}`]}>
          <Routes>
            <Route path="/:slug" element={<DogBreedDetailWrapper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(mockDogBreeds[0].name);
  });

  it('renders "Breed not found" when an invalid slug is provided', async () => {
    const invalidSlug = 'non-existent-id';

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/${invalidSlug}`]}>
          <Routes>
            <Route path="/:slug" element={<DogBreedDetailWrapper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(await screen.findByText('Breed not found')).toBeInTheDocument();
  });

  it('renders "Breed not found" when slug is missing', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<DogBreedDetailWrapper />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(await screen.findByText('Breed not found')).toBeInTheDocument();
  });
});
