import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import DogBreedGallery from './DogBreedGallery';
import Home from './Home';

describe('Navbar Component', () => {
  it('matches initial snapshot and displays Dog Breed Gallery', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
        <Routes>
          <Route path="/" element={<DogBreedGallery />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('navigates to Dog Breed Gallery page when All Dogs is clicked', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Navbar />
        <Routes>
          <Route path="/" element={<DogBreedGallery />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    const allDogs = screen.getByText(/All dogs/i);
    fireEvent.click(allDogs);

    expect(asFragment()).toMatchSnapshot();
    
    expect(screen.getByText(/Golden Retriever/i)).toBeInTheDocument();
    expect(screen.getByText(/Mittelspitz/i)).toBeInTheDocument();
  });

  it('navigates to Home page when Home is clicked', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
        <Routes>
          <Route path="/" element={<DogBreedGallery />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>,
    );

    const home = screen.getByText(/Home/i);
    fireEvent.click(home);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/Welcome to the dog breeds database!/i)).toBeInTheDocument();
  });
});
