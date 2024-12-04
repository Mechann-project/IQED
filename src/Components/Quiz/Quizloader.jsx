import { Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { LetsGo, one, two, three, countdownSound, letsGoSound } from "../../assets";
import gsap from "gsap";
const audiosound = new Audio(countdownSound);
const MPQuizloader = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(3); 
  const countdownRef = useRef(null);
  const audioRef = useRef(null);
  const countdownImages = [three, two, one, LetsGo];
  const playSound = (num) => {
 
    // if (num > 0) {
    //   audio = new Audio(countdownSound);
    // } else if (num === 0) {
    //   audio = new Audio(letsGoSound);
    // }

    if (audiosound) {
      audiosound.volume = 0.5;
      audiosound.play();
    }
  };
  useEffect(() => {
    

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
      }, 1000);

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
