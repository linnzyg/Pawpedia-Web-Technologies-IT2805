import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

/**
 * Navbar Component
 * - Displays a navigation bar with links to key sections of the application.
 * - Includes a logo for branding purposes.
 */

function Navbar() {
  return (
    <section className="navbar">
      <section>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">All dogs</NavLink>
      </section>
      <section id="navbar">
        <NavLink to="/favorites">Favorites</NavLink>
        <img src="/src/assets/paw.png" alt="Logo" className="navbar-logo" />
      </section>
    </section>
  );
}

export default Navbar;
