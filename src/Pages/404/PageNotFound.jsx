import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { PNF_404, WhiteBackgroundSVG, YellowBackgroundSVG } from '../../assets'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        textAlign: 'center',
        backgroundImage: `url(${WhiteBackgroundSVG})`,  // Add the background image
        backgroundSize: 'cover',  // Make sure it covers the entire page
        backgroundPosition: 'center',  // Center the background
      }}
    >
      <img src={PNF_404} alt="Page Not Found" width="60%" height="60%" />
      <Typography
        variant="h6"
        sx={{
          mt: 3,
          fontWeight: 'bold',
        }}
      >
        Oops! The page you are looking for does not exist.
      </Typography>

      <Button
        type="submit"
        variant="contained"
        onClick={handleGoHome}
        sx={{
          fontWeight: "bold",
          backgroundColor: "#1A49BA",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "Black",
          },
          boxShadow: "2px 3px #FFDA55",
        }}
      >
        Go to Home
      </Button>
    </Box>
  )
}

export default PageNotFound
