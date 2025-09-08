import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Timeline,
  TimelineConnector,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot
} from '@mui/lab';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { IconButton, Box, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CakeIcon from '@mui/icons-material/Cake';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StarIcon from '@mui/icons-material/Star';
import BirthdaySurprise from './components/BirthdaySurprise';
import BackgroundMusic from './components/BackgroundMusic';
import img1 from './assets/1.jpeg';
import img2 from './assets/2.jpeg';
import img3 from './assets/3.jpeg';
import img4 from './assets/4.jpeg';
import img5 from './assets/5.jpeg';
import img6 from './assets/6.jpeg';
import img7 from './assets/7.jpeg';
import img8 from './assets/8.jpeg';
import img9 from './assets/9.jpeg';
import img10 from './assets/10.jpeg';

function App() {
  const [count, setCount] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [showHearts, setShowHearts] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showSurprise, setShowSurprise] = useState(false)

  const birthdayMessages = [
    {
      title: "🎉 Happy Birthday, My Love! 🎉",
      content: "Today is all about celebrating the amazing person you are. You bring so much joy and love into my life every single day.",
      icon: <CakeIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img1
    },
    {
      title: "💕 You're My Everything 💕",
      content: "Every moment with you feels like a gift. Your smile lights up my world and your love makes every day special.",
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img2
    },
    {
      title: "🌟 You're Simply Amazing 🌟",
      content: "Your kindness, your strength, your beautiful soul - you're everything I could ever ask for and more.",
      icon: <StarIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img3
    },
    {
      title: "🎵 Our Love Story 🎵",
      content: "Every day with you is a new chapter in our beautiful love story. I can't wait to write many more chapters together.",
      icon: <MusicNoteIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img4
    },
    {
      title: "🌸 Little Moments, Big Smiles 🌸",
      content: "It's the tiny, sweet moments with you that fill my heart the most.",
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img5
    },
    {
      title: "🎶 Our Favorite Vibes 🎶",
      content: "From silly dances to shared playlists, your laughter is my melody.",
      icon: <MusicNoteIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img6
    },
    {
      title: "📸 Captured Memories 📸",
      content: "Every picture tells our story—warmth, care, and endless love.",
      icon: <StarIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img7
    },
    {
      title: "🌈 Bright Days Ahead 🌈",
      content: "With you, the future looks colorful, hopeful, and full of magic.",
      icon: <CakeIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img8
    },
    {
      title: "💫 You Shine So Bright 💫",
      content: "Your kindness lights up every room—and my world too.",
      icon: <StarIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img9
    },
    {
      title: "🎁 Forever My Favorite Gift 🎁",
      content: "Your love is the greatest present—I cherish you today and always.",
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#ff69b4' }} />,
      image: img10
    }
  ]

  const handleTimelineClick = (index) => {
    setCurrentStep(index)
    setCurrentMessage(birthdayMessages[index])
    setOpenDialog(true)
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 2000)
  }

  const handleSpecialSurprise = () => {
    setShowSurprise(true)
  }

  useEffect(() => {
    // Add some floating hearts animation
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowHearts(true)
        setTimeout(() => setShowHearts(false), 1500)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className='parent-box'>
        <header className="navbar-heading">
          <h1>Happy Birthday Bubby! 💖</h1>
        </header>
        
        <div className="timeline-scroll-container">
          <Timeline position='alternate'>
            {birthdayMessages.map((message, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot 
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, #00B8D9 0%, #00ACC1 100%)',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 6px 20px rgba(0, 184, 217, 0.4)',
                      minWidth: '60px',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      '&:hover': {
                        transform: 'scale(1.15)',
                        boxShadow: '0 8px 30px rgba(0, 184, 217, 0.6)',
                        border: '3px solid rgba(255, 255, 255, 0.5)'
                      }
                    }}
                    onClick={() => handleTimelineClick(index)}
                  >
                    {index === 0 && '🎂'}
                    {index === 1 && '💖'}
                    {index === 2 && '✨'}
                    {index === 3 && '🎭'}
                    {index === 4 && '🌸'}
                    {index === 5 && '🎶'}
                    {index === 6 && '📸'}
                    {index === 7 && '🌈'}
                    {index === 8 && '💫'}
                    {index === 9 && '🎁'}
                  </TimelineDot>
                  <TimelineConnector sx={{
                    background: 'linear-gradient(180deg, #00B8D9 0%, #00ACC1 100%)',
                    width: '3px',
                    boxShadow: '0 0 10px rgba(0, 184, 217, 0.3)',
                    borderRadius: '2px'
                  }} />
                </TimelineSeparator>
                <TimelineContent>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(255, 105, 180, 0.3)'
                      }
                    }}
                    onClick={() => handleTimelineClick(index)}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ color: '#ff69b4', fontWeight: 'bold' }}>
                        {message.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        Click to read more... 💕
                      </Typography>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          
          {/* Special Surprise Button */}
          <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
            <Button
              variant="contained"
              onClick={handleSpecialSurprise}
              className="special-surprise-button"
            >
              🎁 Special Birthday Surprise! 🎁
            </Button>
          </Box>
        </div>

        {/* Floating Hearts Animation */}
        {showHearts && (
          <div className="floating-hearts">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                💖
              </div>
            ))}
          </div>
        )}

        {/* Special Message Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ff69b4 0%, #a020f0 100%)',
              color: 'white'
            }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              {currentMessage.icon}
              <Typography variant="h5" component="div">
                {currentMessage.title}
              </Typography>
            </div>
          </DialogTitle>
          <DialogContent 
            sx={{ 
              position: 'relative', 
              overflow: 'hidden',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            {/* Combined View - Text and Image Together */}
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              {/* Message Text */}
              <Typography variant="body1" sx={{ 
                textAlign: 'center', 
                mb: 3, 
                lineHeight: 1.8,
                fontSize: '1.1rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>
                {currentMessage.content}
              </Typography>
              
              {/* Image */}
              <CardMedia
                component="img"
                image={currentMessage.image}
                alt="Birthday surprise"
                sx={{
                  width: '100%',
                  maxWidth: '280px',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: 3,
                  margin: '0 auto',
                  border: '3px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button 
              onClick={() => setOpenDialog(false)}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
              variant="outlined"
            >
              Close with Love 💕
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Birthday Surprise Component */}
        <BirthdaySurprise 
          isVisible={showSurprise} 
          onClose={() => setShowSurprise(false)} 
        />
        
        {/* Background Music Player */}
        <BackgroundMusic />
      </div>
    </>
  )
}

export default App
