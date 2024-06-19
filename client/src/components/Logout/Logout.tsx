// @ts-nocheck

import './Logout.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';

const Logout = ({setIsLoggedIn}) => {
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/logout/`);
      Cookies.remove('spotify_token');
      setIsLoggedIn(false);
      window.location.href = `${import.meta.env.VITE_REACT_APP_URL}`;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='logout-button-container'>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;