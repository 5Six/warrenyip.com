import { Link } from "react-router-dom";
import React from 'react';
import './Navbar.css';

interface NavbarProps {
  contactRef: React.RefObject<HTMLElement>;
}

const Navbar: React.FC<NavbarProps> = ({contactRef}) => {
  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    };
  };

  return (
    <nav className="navbar">
      <div className='container'>
        <div className='logo'>
          
        </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {/*<li><button>Projects</button></li>*/}
            <li><Link to="/Statify">Statify</Link></li>
            <li><Link to="/Heardle">Heardle</Link></li>
            <li><button onClick={scrollToContact}>Contact</button></li>
          </ul>
      </div>
    </nav>
  )
}

export default Navbar;