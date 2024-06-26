// @ts-nocheck

import './MostPlayedSongs.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MostPlayedSongs = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchMostPlayedSong = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/get_most_played_song`, {
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
    <div className='top-songs-container'>
      <h2>Top Tracks</h2>
        <ul className='top-songs-list'>
          {topTracks && topTracks.map((track, index) => (
            <li className='top-song-list' key={index}>
              <div className='top-song-container'>
                <div className='top-song-image-container'>
                  <img className='album-image' src={track.album.images[0].url}></img>
                </div>
                <div className='top-song-text-container'>
                  <div className='top-song-name-container'>
                    {index+1 + '. ' + track.name}
                  </div>
                  <div className='top-song-artist-container'>
                    {track.artists[0].name}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default MostPlayedSongs;