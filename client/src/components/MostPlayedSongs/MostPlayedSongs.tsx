import './MostPlayedSongs.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MostPlayedSongs = () => {
  const [mostPlayedSong, setMostPlayedSong] = useState('');

  useEffect(() => {
    const fetchMostPlayedSong = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_most_played_song?token=${Cookies.get('spotify_token')}`);
        console.log(response);
        setMostPlayedSong(response.data.most_played_song);
      } catch (error) {
        console.error('Error fetching the most played song:', error);
      };
    };
    
    fetchMostPlayedSong();
  }, []);

  return (
    <div>
      <p>{mostPlayedSong}</p>
    </div>
  );
};

export default MostPlayedSongs;