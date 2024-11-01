import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DogBreedGallery from './DogBreedGallery';
import { describe, it, expect } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { GET_BREEDS } from '../api/queries';
import { mockDogBreeds } from '../data/mockDogBreeds';
import userEvent from '@testing-library/user-event';

const mocks = [
  {
    request: {
      query: GET_BREEDS,
    },
    result: {
      data: {
        breeds: mockDogBreeds,
      },
    },
  },
];

describe('DogBreedGallery Component', () => {
  it('filters small dogs correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <DogBreedGallery />
        </MemoryRouter>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    await userEvent.selectOptions(screen.getByLabelText(/filter by/i), 'smallDogs');

    // Wait for the filter to be applied and check results
    await waitFor(() => {
      const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
      const smallDogs = mockDogBreeds.filter((breed) => breed.size === 'Small').map((breed) => breed.name);
      expect(displayedDogs).toEqual(smallDogs);
    });
  });

  it('filters large dogs correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <DogBreedGallery />
        </MemoryRouter>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    await userEvent.selectOptions(screen.getByLabelText(/filter by/i), 'bigDogs');

    await waitFor(() => {
      const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
      const largeDogs = mockDogBreeds.filter((breed) => breed.size === 'Large').map((breed) => breed.name);
      expect(displayedDogs).toEqual(largeDogs);
    });
  });

  it('sorts dogs alphabetically', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <DogBreedGallery />
        </MemoryRouter>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    await userEvent.selectOptions(screen.getByLabelText(/sort by/i), 'alpha');

    await waitFor(() => {
      const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
      const sortedDogs = [...mockDogBreeds].sort((a, b) => a.name.localeCompare(b.name)).map((dog) => dog.name);
      expect(displayedDogs).toEqual(sortedDogs);
    });
  });

  it('searches for correct dogs', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <DogBreedGallery />
        </MemoryRouter>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Mit');

    await waitFor(() => {
      expect(screen.getByText('Mittelspitz')).toBeInTheDocument();
    });
  });

  it('resets everything back to normal', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <DogBreedGallery />
        </MemoryRouter>
      </MockedProvider>,
    );

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const input = screen.getByPlaceholderText('Search...');
    await userEvent.type(input, 'Mit');

    const filterDropdown = screen.getByLabelText(/filter by/i);
    await userEvent.selectOptions(filterDropdown, 'bigDogs');

    const sortDropdown = screen.getByLabelText(/sort by/i);
    await userEvent.selectOptions(sortDropdown, 'alpha');

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(input.value).toBe('');
      expect(filterDropdown.value).toBe('chooseFilter');
      expect(sortDropdown.value).toBe('chooseSorting');
    });
  });
});
