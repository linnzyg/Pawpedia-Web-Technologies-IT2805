import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
  return (
    <section id="navbar">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/">All dogs</NavLink>
    </section>
  );
}

export default Navbar;
