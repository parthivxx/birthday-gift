import { useState, useEffect, useRef } from 'react';
import birthdayMusic from '../assets/birthday-music.mp3';
import { Box, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true; // Loop the music
      
      // Try to autoplay when component mounts
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            // Autoplay was prevented, user needs to interact first
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  // Retry autoplay briefly after mount and on visibility change
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const tryPlay = async () => {
      if (!audioRef.current || isPlaying) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {}
    };

    const interval = setInterval(() => {
      attempts += 1;
      if (attempts > maxAttempts) {
        clearInterval(interval);
        return;
      }
      tryPlay();
    }, 1500);

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isPlaying]);

  // User-gesture fallback: start music on first tap/click
  useEffect(() => {
    const tryResumePlayback = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        // Ignore; user may hit the dedicated button instead
      }
    };

    // Use multiple events for broader device support; each is once
    window.addEventListener('pointerdown', tryResumePlayback, { once: true });
    window.addEventListener('touchend', tryResumePlayback, { once: true });
    window.addEventListener('click', tryResumePlayback, { once: true });

    return () => {
      window.removeEventListener('pointerdown', tryResumePlayback);
      window.removeEventListener('touchend', tryResumePlayback);
      window.removeEventListener('click', tryResumePlayback);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };



  return (
    <Box
      className="music-controls"
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 3,
        padding: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={birthdayMusic}
        preload="auto"
        autoPlay
        playsInline
      />
      
      {/* Play/Pause Button */}
      <Tooltip title={isPlaying ? "Pause Music" : "Play Music"}>
        <IconButton
          onClick={togglePlayPause}
          sx={{
            backgroundColor: 'rgba(255, 105, 180, 0.1)',
            color: '#ff69b4',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 180, 0.2)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease',
            width: 48,
            height: 48
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>


    </Box>
  );
};

export default BackgroundMusic;
