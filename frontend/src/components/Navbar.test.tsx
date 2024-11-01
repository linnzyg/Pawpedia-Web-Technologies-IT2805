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
      },
      result: {
        data: {
          breeds: [
            { id: '1', name: 'Golden Retriever', image: 'golden-retriever.jpeg', size: 'Large', favorite: true },
            { id: '2', name: 'Mittelspitz', image: 'mittelspitz.jpeg', size: 'Small', favorite: false },
          ],
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

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
