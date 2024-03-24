import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className='container'>
        <div className='logo'>
          
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;