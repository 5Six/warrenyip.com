import './MostPlayedSongs.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MostPlayedSongs = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchMostPlayedSong = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get_most_played_song`, {
          headers: {
            'Authorization': `Token ${Cookies.get('auth_token')}` 
          }
        });
        setTopTracks(response.data.items);
      } catch (error) {
        console.error('Error fetching the most played song:', error);
      };
    };
    
    fetchMostPlayedSong();
  }, []);

  return (
    <div>
      <h2>Top 50 Played Songs</h2>
        <ul>
          {topTracks && topTracks.map((track, index) => (
            <li key={index}>
              <strong>{track.name}</strong> - {track.artists[0].name}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default MostPlayedSongs;