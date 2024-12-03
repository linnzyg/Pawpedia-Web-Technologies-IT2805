import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BREEDS } from '../api/queries';
import ModeChange from './ModeChange';
import Tooltip from '@mui/material/Tooltip';
import { getRandomBreedId } from '../utils/randomBreedFetcher';
import '../style/Navbar.css';

/**
 * Navbar Component
 * - Displays a navigation bar with links to key sections of the application.
 * - Includes a logo for branding purposes.
 */

function Navbar() {
  const { data } = useQuery(GET_BREEDS, {
    variables: { first: 40 },
    fetchPolicy: 'cache-and-network',
  });
  const [randomBreedId, setRandomBreedId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.breeds?.edges) {
      setRandomBreedId(getRandomBreedId(data.breeds.edges));
    }
  }, [data]);

  const refreshRandomBreed = () => {
    if (data?.breeds?.edges) {
      setRandomBreedId(getRandomBreedId(data.breeds.edges));
    }
  };

  return (
    <section className="navbar">
      <section className="navLinks">
        <ModeChange />
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">All dogs</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink onClick={refreshRandomBreed} to={`/${randomBreedId}`}>
          Lucky dog!
        </NavLink>
      </section>

      <section id="navbar">
        <Tooltip title="View all dogs">
          <NavLink to="/">
            <img src="/src/assets/paw.png" alt="Logo" className="navbar-logo" />
          </NavLink>
        </Tooltip>
      </section>
    </section>
  );
}

export default Navbar;
