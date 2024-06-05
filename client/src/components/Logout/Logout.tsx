import './Logout.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';

const Logout = ({setIsLoggedIn}) => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout/');
      Cookies.remove('spotify_token');
      setIsLoggedIn(false);
      window.location.href = 'http://localhost:5173/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='login-button-container'>
      <button className='login-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;