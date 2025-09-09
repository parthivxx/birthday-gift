import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import Confetti from 'react-confetti';

const BirthdaySurprise = ({ isVisible, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSurprise, setCurrentSurprise] = useState(0);

  const surprises = [
    {
      title: "🎂 Birthday Wishes! 🎂",
      message: "May your day be filled with laughter, love, and all the happiness you bring to others!",
      emoji: "🎉"
    },
    {
      title: "💝 You're Special! 💝",
      message: "I know I'm not the best boy-friend but I'll keep pushing myself to be the best for you.",
      emoji: "✨"
    },
    {
      title: "🌟 Dream Big! 🌟",
      message: "May all your dreams come true and may this year bring you everything you've been wishing for!",
      emoji: "🎊"
    },
    {
      title: "💕 Love You! 💕",
      message: "You make every day feel like a celebration. Here's to many more beautiful moments together , Happy Birthday!",
      emoji: "💖"
    }
  ];

  useEffect(() => {
    if (isVisible) {
      setCurrentSurprise(0); // Reset to first surprise when opening
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [isVisible]);

  const handleNextSurprise = () => {
    if (currentSurprise < surprises.length - 1) {
      setCurrentSurprise(currentSurprise + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(5px)',
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      {showConfetti && <Confetti />}
      
      <Paper
        elevation={24}
        sx={{
          padding: { xs: 3, sm: 4 },
          maxWidth: { xs: '100%', sm: 500 },
          width: '100%',
          textAlign: 'center',
          borderRadius: { xs: 3, sm: 4 },
          background: 'linear-gradient(135deg, #ff69b4 0%, #a020f0 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideIn 0.5s ease-out',
          maxHeight: { xs: '80vh', sm: '70vh' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 3s ease-in-out infinite',
            display: { xs: 'none', sm: 'block' }
          }}
        />
        
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            mb: { xs: 2, sm: 3 },
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1.2,
            px: 1
          }}
        >
          {surprises[currentSurprise].emoji} {surprises[currentSurprise].title} {surprises[currentSurprise].emoji}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            lineHeight: 1.6,
            mb: { xs: 3, sm: 4 },
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            px: 1
          }}
        >
          {surprises[currentSurprise].message}
        </Typography>
        
        <Button
          variant="contained"
          onClick={handleNextSurprise}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: 25,
            px: { xs: 3, sm: 4 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: '1rem', sm: '1.1rem' },
            fontWeight: 'bold',
            minHeight: { xs: 48, sm: 56 },
            minWidth: { xs: 120, sm: 160 },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              transform: 'scale(1.02)'
            },
            '&:active': {
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              transform: 'scale(0.98)'
            },
            transition: 'all 0.3s ease',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {currentSurprise < surprises.length - 1 ? 'Next Surprise 💫' : 'Close with Love 💕'}
        </Button>
        
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: { xs: 2, sm: 3 },
            opacity: 0.8,
            fontSize: { xs: '0.8rem', sm: '0.9rem' }
          }}
        >
          {currentSurprise + 1} of {surprises.length}
        </Typography>
      </Paper>
    </Box>
  );
};

export default BirthdaySurprise;
