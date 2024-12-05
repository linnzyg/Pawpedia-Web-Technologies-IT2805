import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_BREED } from '../api/queries';
import ModeChange from './ModeChange';
import Tooltip from '@mui/material/Tooltip';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CasinoIcon from '@mui/icons-material/Casino';
import InfoIcon from '@mui/icons-material/Info';

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
      <section className="navSplit">
        <Tooltip title="View all dogs">
          <NavLink to="/">
            <PetsIcon />
            <h2>All dogs</h2>
          </NavLink>
        </Tooltip>
        <Tooltip title="View your favorites">
          <NavLink to="/favorites">
            <FavoriteIcon />
            <h2>Favorites</h2>
          </NavLink>
        </Tooltip>
        <Tooltip title="View a random dog">
          <NavLink onClick={fetchNewBreed} to={`/${data.randomBreed.id}`}>
            <CasinoIcon />
            <h2>Lucky dog!</h2>
          </NavLink>
        </Tooltip>
      </section>
      <section className="navSplit">
        <Tooltip title="Read about Pawpedia">
          <NavLink to="/about">
            <InfoIcon />
            <h2>About Us</h2>
          </NavLink>
        </Tooltip>
        <ModeChange />
      </section>
    </section>
  );
}

export default Navbar;
