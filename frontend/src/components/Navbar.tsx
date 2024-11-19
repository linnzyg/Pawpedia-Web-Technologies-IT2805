import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';
import ModeChange from './ModeChange';
import Tooltip from '@mui/material/Tooltip';

/**
 * Navbar Component
 * - Displays a navigation bar with links to key sections of the application.
 * - Includes a logo for branding purposes.
 */

function Navbar() {
  return (
    <section className="navbar">
      <section className="navLinks">
        <ModeChange/>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">All dogs</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
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
