import { useState, useEffect, useRef } from 'react';
import birthdayMusic from '../assets/birthday-music.mp3';
import { Box, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume] = useState(0.5);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      
      // Try to autoplay immediately
      const attemptAutoplay = async () => {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented, waiting for user interaction');
          setIsPlaying(false);
        }
      };
      
      attemptAutoplay();
    }
  }, []);

  // Handle user interaction to enable autoplay
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!hasUserInteracted && audioRef.current && !isPlaying) {
        setHasUserInteracted(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Still cannot autoplay:', error);
        }
      }
    };

    // Listen for any user interaction
    const events = ['click', 'touchstart', 'keydown', 'mousedown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [hasUserInteracted, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Cannot play audio:', error);
        }
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
      <Tooltip title={
        isPlaying 
          ? "Pause Music" 
          : hasUserInteracted 
            ? "Play Music" 
            : "Click anywhere to enable music autoplay"
      }>
        <IconButton
          onClick={togglePlayPause}
          sx={{
            backgroundColor: isPlaying 
              ? 'rgba(255, 105, 180, 0.2)' 
              : 'rgba(255, 105, 180, 0.1)',
            color: '#ff69b4',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 180, 0.3)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease',
            width: 48,
            height: 48,
            // Add a subtle pulse animation when waiting for user interaction
            animation: !hasUserInteracted && !isPlaying 
              ? 'pulse 2s infinite' 
              : 'none',
            '@keyframes pulse': {
              '0%': { opacity: 0.7 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.7 }
            }
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>


    </Box>
  );
};

export default BackgroundMusic;
