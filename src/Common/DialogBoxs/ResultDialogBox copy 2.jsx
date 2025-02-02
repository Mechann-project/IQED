import React from "react";
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

import { RewardCard } from "../../Common";
import { IQCoinIcon, SuccessManSVG } from "../../assets";

const ResultDialogBox = ({
  SessionState,
  open,
  handleReview,
  handleDone,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '00')}`;
  }

  const totalQuestions = SessionState.questionCount;
  const correctAnswers = SessionState.score;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  const message = scorePercentage >= 80 ? "Awesome! You completed the test." : "Good effort! Try again to improve.";

  // Card data
  const cardData = [
    {
      title: "Time Taken",
      leftText: formatTime(SessionState.timeTaken),
    },
    {
      title: "Answered",
      leftText: correctAnswers,
    },
    {
      title: "Total Coins Earned",
      leftText: "",
      coinValue: correctAnswers * 10 + 20,
    },
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
          boxSizing: "border-box",
          border: "1px solid",
          borderColor: "#02216F",
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isSm ? "16px" : "28px",
            padding: "2px",
          }}
        >
          {message}
        </Typography>

        <Divider sx={{ bgcolor: "#FFDA55", height: "2px", width: "100%" }} />
        <Grid
          container
          spacing={3}
          sx={{
            padding: isSm ? "10px" : "30px",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src={SuccessManSVG}
              alt="Player image"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: isSm ? "200px" : "350px",
              }}
            />
            <Box sx={{ display: "flex", gap: 4, width: isSm ? null : "100%" }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleReview}
                sx={{ ...buttonStyles("#FFDA55", "#02216F") }}
              >
                Review
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleDone}
                sx={{ ...buttonStyles("#FFDA55", "#02216F") }}
              >
                {scorePercentage >= 80 ? "Done" : "Retry"}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
              gap={2}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#02216F",
                  borderRadius: "15px",
                  padding: "10px 20px",
                  width: "100%",
                  maxWidth: "350px",
                  boxSizing: "border-box",
                  mb: 2,
                }}
              >
                {/* Title Section */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    mb: 1,
                    fontSize: isSm ? "12px" : null,
                  }}
                >
                  Result
                </Typography>

               
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                  }}
                >

                  <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:'30px'
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        color: "#02216F",
                        textAlign: "left",
                        fontSize: isSm ? "16px" : null,
                      }}
                    >
                      text
                    </Typography>
                   
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px",justifyContent:'center' }}>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                          color: "#02216F",
                          fontSize: isSm ? "16px" : null,
                        }}
                      >30
                      </Typography>
                      <Box
                        component="img"
                        src={IQCoinIcon}
                        alt="coin"
                        sx={{
                          width:"20px",
                          height: "20px",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* {cardData.map((card, index) => (
                <RewardCard
                  key={index}
                  title={card.title}
                  leftText={card.leftText}
                  coinValue={card.coinValue}
                />
              ))} */}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

// Button style helper function
const buttonStyles = (bgColor, textColor) => ({
  fontWeight: "bold",
  backgroundColor: bgColor,
  color: textColor,
  boxShadow: "2px 3px #02216F",
  borderRadius: "10px",
  textTransform: "none",
  border: "1px solid",
  borderColor: textColor,
  "&:hover": {
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    transform: "translateY(-5px)",
    boxShadow: "2px 3px #02216F",
  },
});

export default ResultDialogBox;
