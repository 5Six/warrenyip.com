import React, { useState, useRef} from 'react';
import './AudioControls.css';

const AudioControls = ({src}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayReset = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className='audio-player-container'>
      <audio ref={audioRef} src={src}></audio>
      <button onClick={handlePlayReset} className={isPlaying ? 'playing':''}>
        {isPlaying ? 'Reset' : 'Play'}
      </button>
    </div>
  );
};

export default AudioControls;