// @ts-nocheck

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import './AudioControls.css';

const AudioControls = forwardRef(({src, onTimeUpdate}, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [playUntil, setPlayUntil] = useState(0);

  useImperativeHandle(ref, () => ({
    setPlayUntil: (n: number) => setPlayUntil(n)
  }))

  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      if (onTimeUpdate) {
        onTimeUpdate(audio.currentTime, audio.duration);
      }
    };
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [onTimeUpdate]);

  const handlePlayReset = () => {
    const audio = audioRef.current;
    const resetAudio = () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      console.log(isPlaying)
    };

    if (audio && audio.paused) {
      audio.play();
      setIsPlaying(true);
      audio.addEventListener('ended', resetAudio);

      if (playUntil) {
        const checkTime = () => {
          if (audio.currentTime >= playUntil) {
            resetAudio();
            audio.removeEventListener('timeupdate', checkTime);
          }
        };

        audio.addEventListener('timeupdate', checkTime);
      }
    } else {
      resetAudio();
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
});

export default AudioControls;