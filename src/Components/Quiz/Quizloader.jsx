import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { LetsGo, one, two, three, countdownSound, letsGoSound } from "../../assets";
import gsap from "gsap";

const MPQuizloader = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(3); // Start countdown from 3
  const countdownRef = useRef(null);
  const audioRef = useRef(null);

  const countdownImages = [three, two, one, LetsGo];

  useEffect(() => {
    const playSound = (num) => {
      if (audioRef.current) audioRef.current.pause(); // Stop any previous sound
      let sound;

      if (num > 0) {
        sound = new Audio(countdownSound);
      } else if (num === 0) {
        sound = new Audio(letsGoSound);
      }

      audioRef.current = sound;
      if (sound) {
        sound.volume = 0.5; // Set volume to 50%
        sound.play();
      }
    };

    if (countdown >= 0) {
      playSound(countdown);

      // GSAP animation for countdown effect
      if (countdownRef.current) {
        gsap.fromTo(
          countdownRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" }
        );
      }

      // Delay before showing the next countdown number
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1300);

      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [countdown, onComplete]);

  const getIllustratedNumber = (num) => (
    <img ref={countdownRef} src={countdownImages[3 - num]} alt={num === 0 ? "Lets Go" : num} style={{
      maxWidth: "80%", 
      height: "auto",
    }} />
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {getIllustratedNumber(countdown)}
      </Box>
    </Box>
  );
};

export default MPQuizloader;
