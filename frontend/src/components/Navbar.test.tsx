import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import DogBreedGallery from './DogBreedGallery';
import Home from './Home';
import { MockedProvider } from '@apollo/client/testing';
import { GET_BREEDS } from '../api/queries';
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  const mocks = [
    {
      request: {
        query: GET_BREEDS,
        variables: {
          first: 4,
          after: null,
          filterBySize: undefined,
        },
      },
      result: {
        data: {
          breeds: {
            edges: [
              {
                cursor: '1',
                node: { id: '1', name: 'Golden Retriever', image: 'golden-retriever.jpeg', size: 'Large', favorite: true },
              },
              {
                cursor: '2',
                node: { id: '2', name: 'Mittelspitz', image: 'mittelspitz.jpeg', size: 'Small', favorite: false },
              },
            ],
            pageInfo: {
              hasNextPage: false,
              endCursor: '2',
            },
            totalCount: 2,
          },
        },
      },
    },
  ];

  it('matches initial snapshot and displays Dog Breed Gallery', async () => {
    const { asFragment } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<DogBreedGallery />} />
            <Route path="/home" element={<Home />} />
          </Routes>
          <Navbar />
        </MemoryRouter>
      </MockedProvider>,
    );

    // Wait until the data has loaded
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Take the snapshot after the data is loaded
    expect(asFragment()).toMatchSnapshot();
  });
});
