import { Box, Typography } from "@mui/material";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const LaunchTimer = forwardRef(({ start, isMP = false, initialTime }, ref) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (start) setIsRunning(true);
  }, [start]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hrs: hrs.toString().padStart(2, "0"),
      mins: mins.toString().padStart(2, "0"),
      secs: secs.toString().padStart(2, "0"),
    };
  };

  const formattedTime = formatTime(time);

  useImperativeHandle(ref, () => ({
    pauseTimer: () => setIsRunning(false),
    resetTimer: () => setTime(initialTime),
    startTimer: () => setIsRunning(true),
    getCurrentTime: () => time,
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        top: isMP ? { lg: "0%", xs: "10%", sm: "10%" } : "0%",
        right: "0%",
        bgcolor: "#02216F",
        width: { lg: "300px", xs: "200px", sm: "200px" },
        height: { lg: "100px", xs: "70px", sm: "70px" },
        justifyContent: "center",
        alignItems: "center",
        borderRadius: { xs: "10px", md: "20px", lg: "20px", sm: "10px" },
        borderLeft: "2px solid #FFDA55",
        borderBottom: "2px solid #FFDA55",
        ...(isMP && {
          borderTop: { lg: "0px solid #FFDA55", xs: "2px solid #FFDA55", sm: "2px solid #FFDA55" },
        }),
      }}
      gap={1}
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        {/* Hours */}
        <TimeBlock value={formattedTime.hrs} label="HRS" />
        {/* Minutes */}
        <TimeBlock value={formattedTime.mins} label="MINS" />
        {/* Seconds */}
        <TimeBlock value={formattedTime.secs} label="SECS" />
      </Box>
    </Box>
  );
});

// Component for individual time block
const TimeBlock = ({ value, label }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    sx={{
      width: { lg: "60px", xs: "40px", sm: "40px" },
      bgcolor: "#FFDA55",
      borderRadius: "6px",
      padding: "4px",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        fontSize: { lg: "18px", xs: "12px", sm: "12px" },
        color: "#02216F",
      }}
    >
      {value}
    </Typography>
    <Typography
      sx={{
        fontSize: { lg: "10px", xs: "8px", sm: "8px" },
        color: "#02216F",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {label}
    </Typography>
  </Box>
);

LaunchTimer.displayName = "LaunchTimer";

export default LaunchTimer;
