import { Box, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Timer = forwardRef(({ start, initialTime }, ref) => {
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
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useImperativeHandle(ref, () => ({
    pauseTimer: () => setIsRunning(false),
    resetTimer: () => setTime(initialTime),
    startTimer: () => setIsRunning(true),
    getCurrentTime: () => time,
  }));

  const progressValue = (time / initialTime) * 100;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: "fixed",
        top: { lg: "6%", xs: "11%", sm: "11%" },
        right: "5%",
      }}
      gap={1}
    >
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={progressValue}
          size={150}
          thickness={2}
          sx={{ color: "white" }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "800",
              letterSpacing: "5px",
              fontSize: "24px",
              color: "white",
            }}
          >
            {formatTime(time)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

Timer.displayName = "Timer";

export default Timer;
