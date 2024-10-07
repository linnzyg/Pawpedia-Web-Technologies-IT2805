import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DogBreedGallery from './DogBreedGallery';
import { mockDogBreeds } from '../data/mockDogBreeds';
import { describe, it, expect } from 'vitest';
import { Size } from '../types/DogBreed';
import userEvent from '@testing-library/user-event';

describe('DogBreedGallery Component', () => {
  it('renders the correct number of breed cards', () => {
    render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>,
    );

    const breedCards = screen.getAllByRole('heading', { level: 2 });
    expect(breedCards).toHaveLength(mockDogBreeds.length);
  });

  it('displays breed names and images correctly', () => {
    render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>,
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
      </MemoryRouter>,
    );

    mockDogBreeds.forEach((breed) => {
      const image = screen.getByAltText(breed.name);
      const link = image.closest('a');
      expect(link).toHaveAttribute('href', `/${breed.slug}`);
    });
  });

  it('filters small dogs correctly', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>,
    );

    await userEvent.selectOptions(screen.getByLabelText(/filter by/i), 'smallDogs');

    const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    const smallDogs = mockDogBreeds.filter((breed) => breed.size === Size.Small).map((breed) => breed.name);

    expect(displayedDogs).toEqual(smallDogs);
    expect(asFragment()).toMatchSnapshot();
  });

  it('filters large dogs correctly', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>,
    );

    await userEvent.selectOptions(screen.getByLabelText(/filter by/i), 'bigDogs');

    const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
    const smallDogs = mockDogBreeds.filter((breed) => breed.size === Size.Large).map((breed) => breed.name);

    expect(displayedDogs).toEqual(smallDogs);
    expect(asFragment()).toMatchSnapshot();
  });

  it('sorts dogs alphabetically', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <DogBreedGallery />
      </MemoryRouter>,
    );

    await userEvent.selectOptions(screen.getByLabelText(/sort by/i), 'alpha');

    const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);

    const sortedDogs = [...mockDogBreeds].sort((a, b) => a.name.localeCompare(b.name)).map((dog) => dog.name);

    expect(displayedDogs).toEqual(sortedDogs);
    expect(asFragment()).toMatchSnapshot();
  });
});

it('sorts dogs by favorites', async () => {
  const { asFragment } = render(
    <MemoryRouter>
      <DogBreedGallery />
    </MemoryRouter>,
  );

  await userEvent.selectOptions(screen.getByLabelText(/sort by/i), 'favorites');

  const displayedDogs = screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
  const favoriteDogs = mockDogBreeds.filter((breed) => breed.favorite === true).map((breed) => breed.name);

  expect(displayedDogs).toEqual(favoriteDogs);
  expect(asFragment()).toMatchSnapshot();
});

it('searches for correct dogs', async () => {
  const { asFragment} = render(
    <MemoryRouter>
      <DogBreedGallery />
    </MemoryRouter>
  )
  const input = screen.getByPlaceholderText('Search...');
  fireEvent.change(input, { target: { value: 'Mit' } });

  await waitFor(() => {
    expect(screen.getByText('Mittelspitz')).toBeInTheDocument();
  });

  expect(asFragment()).toMatchSnapshot();
});

it('resets everything back to normal', async () => {
  const { asFragment } = render (
    <MemoryRouter>
      <DogBreedGallery />
    </MemoryRouter>
  )
  const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Mit' } });

  const filterDropdown = screen.getByLabelText(/filter by/i) as HTMLSelectElement;
  fireEvent.change(filterDropdown, { target: { value: 'bigDogs' } });

  const sortDropdown = screen.getByLabelText(/sort by/i) as HTMLSelectElement;
  fireEvent.change(sortDropdown, { target: { value: 'alpha' } });

  const resetButton = screen.getByRole('button', { name: /reset/i });
  fireEvent.click(resetButton);

  expect(input.value).toBe(''); 
  expect(filterDropdown.value).toBe('chooseFilter'); 
  expect(sortDropdown.value).toBe('chooseSorting');

  expect(asFragment()).toMatchSnapshot();
});





