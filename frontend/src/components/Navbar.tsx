
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {

  return (
    <section id='navbar'>
      <NavLink to="/home">
        Home 
      </NavLink>
      <NavLink to="/">
        All dogs 
      </NavLink>
      <input type="text" placeholder="Search.."></input>
    </section>
  );
}

export default Navbar;
