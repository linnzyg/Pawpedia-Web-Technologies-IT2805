import { NavLink } from "react-router-dom";
import "../style/Navbar.css";
import { useQuery } from "@apollo/client";
import { GET_RANDOM_BREED } from "../api/queries";
import ModeChange from './ModeChange';
import Tooltip from '@mui/material/Tooltip';

/**
 * Navbar Component
 * - Displays a navigation bar with links to key sections of the application.
 * - Includes a logo for branding purposes.
 */

function Navbar() {
  const { loading, error, data, refetch } = useQuery(GET_RANDOM_BREED);

  // Function to select a random breed ID
  const fetchNewBreed = () => {
    refetch();
  };

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
        <NavLink onClick={fetchNewBreed} to={`/${data.randomBreed.id}`}>
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
