// @ts-nocheck

import './Heardle.css';
import Login from '../../components/Login';
import Logout from '../../components/Logout';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AudioControls from '../../components/AudioControls';
import { Link, useLocation } from "react-router-dom";

const Heardle = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(null);
  const [answerUrl, setAnswerUrl] = useState(null);
  const [answerInput, setAnswerInput] = useState('');
  const [gameState, setGameState] = useState('');
  const [guessRemaining, setGuessRemaining] = useState(6);
  const [playlistId, setPlaylistId] = useState('');
  const [loading, setLoading] = useState(false);
  const [playlistIdError, setPlaylistIdError] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [playlistImages, setPlaylistImages] = useState({});

  const audioControlsRef = useRef();
  const answerInputRef = useRef();
  const playlistInputRef = useRef();
  const location = useLocation();

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const appUrl = import.meta.env.VITE_REACT_APP_URL;

  const playUntil = [1,2,4,8,16,30]
  const sidebarPlaylistData = [
    {name: 'Taylor Swift', id: '37i9dQZF1DX5KpP2LN299J'},
    {name: 'Lana Del Rey', id: '37i9dQZF1DZ06evNZVVBPG'},
    {name: 'Kendrick Lamar', id: '37i9dQZF1DZ06evO1IPOOk'}
  ]

  useEffect(() => {
    const checkAuth = () => {
      if (Cookies.get('spotify_token') != undefined) {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const playlist_id = params.get('playlist_id');
    if (playlist_id) {
      setPlaylistId(playlist_id);
      setQuery(playlist_id);
    } else {
      setGameState('');
      setQuery('');
      setPlaylistIdError(false);
      if (playlistInputRef.current) {
        playlistInputRef.current.value = '';
      }
    }
    setGuessRemaining(6);
    setSearchResults([]);
    setAnswerInput('');
    if (answerInputRef.current) {
      answerInputRef.current.value = '';
    }
  }, [location]);

  useEffect(() => {
    if (playlistId) {
      handlePlayButton();
    }
  }, [playlistId]);

  useEffect(() => {
    if (audioControlsRef.current) {
      audioControlsRef.current.setPlayUntil(playUntil[6-guessRemaining]);
    }
  }, [guessRemaining, audioReady])

  useEffect(() => {
    const fetchPlaylistImages = async () => {
      const fetchedImages = {};
      await Promise.all(sidebarPlaylistData.map(async (playlist) => {
        try {
          const response = await axios.get(`${apiUrl}/get_playlist/`, {
            params: { playlist_id: playlist.id },
            headers: { 'Authorization': `Token ${Cookies.get('auth_token')}` }
          });
          const data = response.data;
          if (data.images && data.images.length > 0) {
            fetchedImages[playlist.id] = data.images[0].url;
          }
        } catch (error) {
          console.error('Error fetching playlist image:', error);
        }
      }));
      setPlaylistImages(fetchedImages);
    };

    fetchPlaylistImages();
  }, []);

  const handlePlayButton = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/get_all_playlist_tracks?playlist_id=${query}`, {
        headers: {
          'Authorization': `Token ${Cookies.get('auth_token')}` 
        }
      })
      const data = response.data;
      const randomAnswer = data[Math.floor(Math.random() * data.length)];
      console.log(randomAnswer)
      console.log(randomAnswer[1])
      setAnswer(randomAnswer);
      setAnswerUrl(randomAnswer[2]);
      setGameState('guess');
      setAudioReady(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setPlaylistIdError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (answerInput == answer[0]) {
      setGameState('won');
    }
    else if (answerInput != answer[0]) {
      setGuessRemaining(guessRemaining-1);
    }
  };

  const onAnswerInputChange = async (e) => {
    const value = e.target.value;
    setAnswerInput(value)
    if (value.length > 0) {
      try {
        const response = await axios.get(`${apiUrl}/search`, {
          params: {
            q: value,
            search_type: 'track',
          },
          headers: {
            'Authorization': `Token ${Cookies.get('auth_token')}` 
          }
        })
        setSearchResults(response.data.tracks.items);
      }
      catch (error) {
        console.error('Error searching Spotify:', error);
      }
    }
    else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (track) => {
    setAnswerInput(track.name);
    answerInputRef.current.value = track.name;
    setSearchResults([]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='heardle-container'>
      {!isLoggedIn ? (
        <Login/>
      ) : (
        <div>
          <button className="open-btn" onClick={toggleSidebar}>☰</button>
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <ul className='sidebar-list'>
              {sidebarPlaylistData.map(playlist => (
                <div className='sidebar-item' key={playlist.id}>
                  <img className='sidebar-playlist-image' src={playlistImages[playlist.id]} alt={`${playlist.name} Playlist`} />
                  <li>
                    <Link to={`/Heardle?playlist_id=${playlist.id}`}>{playlist.name}</Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className='logout-button-container-heardle'>
            <Logout setIsLoggedIn={setIsLoggedIn} />
          </div>
          <h1 className='heardle-title'>Heardle</h1>
          {loading && <div>Loading...</div>}
          {loading || gameState == '' &&
            <div>
              <div>
                <input ref={playlistInputRef} type='text' placeholder='Playlist ID' onChange={(e)=>setQuery(e.target.value)}></input>
                <button onClick={handlePlayButton}>Play</button>
              </div>
              {playlistIdError && <div>Error fetching playlist</div>}
            </div>
          }
          {gameState === 'guess' &&
            <div>
              <div className='heardle-audio-controls-container'>
                {answerUrl && <AudioControls ref={audioControlsRef} src={answerUrl}></AudioControls>}
              </div>
              {gameState === 'guess' && <div>{guessRemaining} guess remaining</div>}
              {guessRemaining > 0 && 
              <div>
                <input className='answer-input' ref={answerInputRef} type='text' placeholder='Type your answer here' onChange={(e)=>onAnswerInputChange(e)}></input>
                <button onClick={handleSubmit}>{answerInput ? 'Submit' : 'Skip'}</button>
                {searchResults.length > 0 && (
                  <ul className='heardle-search-results'>
                    {searchResults.map((track) => (
                      <li className='heardle-search-result' key={track.id} onClick={() => handleSearchResultClick(track)}>
                        <div className='heardle-search-result-name'>{track.name}</div>
                        <div className='heardle-search-result-artist'>{track.artists[0].name}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>}
            </div>
          }
          <div>
            {gameState === 'won' && <div>You've won!</div>}
            {guessRemaining == 0 && gameState != 'won' && <div>You've lost</div>}
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Heardle;