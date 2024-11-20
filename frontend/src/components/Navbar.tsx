import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import { useQuery } from "@apollo/client";
import { GET_BREEDS } from "../api/queries";
import { useState, useEffect } from "react";
import ModeChange from './ModeChange';
import Tooltip from '@mui/material/Tooltip';

/**
 * Navbar Component
 * - Displays a navigation bar with links to key sections of the application.
 * - Includes a logo for branding purposes.
 */

function Navbar() {
  const { data, loading, error } = useQuery(GET_BREEDS, {
    variables: { first: 100 }, 
  });

  const [randomBreedId, setRandomBreedId] = useState<string | null>(null);

  // Function to select a random breed ID
  const fetchRandomBreedId = () => {
    if (data && data.breeds.edges.length > 0) {
      const breedIds = data.breeds.edges.map((edge: any) => edge.node.id);
      const randomIndex = Math.floor(Math.random() * breedIds.length);
      setRandomBreedId(breedIds[randomIndex]);
    }
  };

  // Preload a random breed ID when data is loaded
  useEffect(() => {
    if (data) {
      fetchRandomBreedId();
    }
  }, [data]);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading breeds: {error.message}</p>;

  return (
    <section className="navbar">
      <section className="navLinks">
        <ModeChange/>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">All dogs</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink onClick={fetchRandomBreedId} to={`/${randomBreedId}`}>
          Lucky dog!
        </NavLink>
      </section>
      <section id="navbar">

        <Tooltip title={"View all dogs"}>
          <NavLink to="/">
            <img src="/src/assets/paw.png" alt="Logo" className="navbar-logo" />
          </NavLink>
        </Tooltip>
      </section>
    </section>
  );
}

export default Navbar;
