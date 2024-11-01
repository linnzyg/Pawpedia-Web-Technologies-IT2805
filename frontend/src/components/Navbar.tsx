import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
  return (
    <section className="navbar">
      <section>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/">All dogs</NavLink>
      </section>
      <img src="/src/assets/paw.png" alt="Logo" className="navbar-logo" />
    </section>
  );
}

export default Navbar;
