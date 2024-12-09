import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RewardCard } from "..";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";

const MPResultDialogBox = ({
  SessionState,
  open,
  handleReview,
  Level,
  handleDone,
  Totalxp,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const GameData = useSelector((state) => state.GameState);
  const GameSessionState = useSelector((state) => state.GameSessionState);
  const isLoggedIn = useSelector((state) => state.User?.isLoggedIn);
  const [OppPlayer, setOppPlayer] = useState(null);
  const [ResultMessage, setResultMessage] = useState("Waiting for Player...");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [winnerDeclared, setWinnerDeclared] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (GameSessionState?.status === "completed") {
      setShowCountdown(true);
      setOppPlayer(GameSessionState?.Players[GameData.index === 0 ? 1 : 0]);

      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        determineWinner();
        setWinnerDeclared(true);
      }, 5000);
    }
  }, [GameSessionState]);

  const determineWinner = () => {
    if (GameSessionState?.Winner !== -1) {
      if (GameData.index === GameSessionState?.Winner) {
        setResultMessage("You Win 🎉");
      } else {
        setResultMessage("You Lose 😔");
      }
    } else {
      setResultMessage("Match Tie 🤝");
    }
  };

  const cardData = [
    {
      title: "Answered",
      leftText: SessionState.score,
      coinValue: SessionState.score * 1,
    },
    {
      title: "Time Taken",
      leftText: formatTime(SessionState.timeTaken),
      coinValue: Math.max(0, Math.floor((25 - SessionState.timeTaken / 60) * 1)),
    },
    { title: "Total Coins Earned", coinValue: Totalxp },
  ];

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          border: "1px solid",
          borderColor: "#02216F",
          backgroundColor: "white",
        }}
      >
        {winnerDeclared && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isSm ? "16px" : "28px",
            padding: "2px",
          }}
        >
          {showCountdown && !winnerDeclared
            ? `Revealing Results in ${countdown}...`
            : ResultMessage}
        </Typography>

        <Divider sx={{ bgcolor: "#FFDA55", height: "2px", width: "100%" }} />

        <Grid container spacing={3} sx={{ padding: isSm ? "10px" : "30px" }}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              gap={2}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <RewardCard
                  title="Winner"
                  leftText={
                    winnerDeclared
                      ? GameSessionState?.Winner === GameData.index
                        ? "You"
                        : "Opponent"
                      : "Waiting..."
                  }
                  coinValue={winnerDeclared ? Totalxp : "?"}
                />
                <RewardCard
                  title="Runner"
                  leftText={
                    winnerDeclared
                      ? GameSessionState?.Winner === GameData.index
                        ? "Opponent"
                        : "You"
                      : "Waiting..."
                  }
                  coinValue={winnerDeclared ? Totalxp / 2 : "?"}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 4, width: "100%" }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleReview}
                  sx={buttonStyles("#FFDA55", "#02216F")}
                >
                  Review
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleDone}
                  sx={buttonStyles("#FFDA55", "#02216F")}
                >
                  Done
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            {isLoggedIn ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                {cardData.map((card, index) => (
                  <RewardCard
                    key={index}
                    title={card.title}
                    leftText={card.leftText}
                    coinValue={card.coinValue}
                  />
                ))}
              </Box>
            ) : (
              <Box textAlign="center" mt={3}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Sign Up for More Fun and Learning!
                </Typography>
                <Button
                  variant="contained"
                  sx={buttonStyles("#FFDA55", "#02216F")}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const buttonStyles = (bgColor, textColor) => ({
  fontWeight: "bold",
  backgroundColor: bgColor,
  color: textColor,
  borderRadius: "10px",
  textTransform: "none",
  border: "1px solid",
  borderColor: textColor,
  "&:hover": {
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    transform: "translateY(-5px)",
  },
});

export default MPResultDialogBox;
