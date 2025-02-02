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
import { IQCoinIcon, retry, SuccessManSVG } from "../../assets";
import { useNavigate } from "react-router-dom";

const ResultDialogBox = ({ SessionState, open, handleReview, handleDone }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(
      remainingSeconds
    ).padStart(2, "00")}`;
  }

  const totalQuestions = SessionState.questionCount;
  const correctAnswers = SessionState.score;
  const scorePercentage = (correctAnswers / totalQuestions) * 100;
  const navigate = useNavigate();
  const message =
    scorePercentage >= 80
      ? "Awesome! You completed the test."
      : "Good effort! Try again to improve.";
  const isPass = scorePercentage >= 80;

  function handelClick() {
    if (SessionState?.type == "Challenge" && isPass) {
      navigate(`/challenge/shipping/${SessionState?.Challenge}`);
    } else {
      handleDone();
    }
  }
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
  const rewards = [
    { label: `Correct Answer x ${correctAnswers}`, value: correctAnswers * 10 },
    { label: "Time Taken", value: formatTime(SessionState.timeTaken) },
    { label: `For completion x ${isPass ? 20 : 0}`, value: isPass ? 20 : 0 },
  ];
  const totalCoins = (correctAnswers * 10 )+ (isPass ? 20 : 0);
  
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
            padding: isSm ? "5px" : "30px",
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
              src={isPass ? SuccessManSVG : retry}
              alt="Player image"
              sx={{
                width: "auto",
                height: {
                  xs: "150px",
                  sm: "153px",
                  md: "300px",
                  lg: "350px",
                },
                maxWidth: isSm ? "200px" : "350px",
              }}
            />
            <Box sx={{ display: "flex", gap: 4, width: isSm ? null : "100%" }}>
              {SessionState?.type != "Challenge" && <Button
                variant="contained"
                fullWidth
                onClick={handleReview}
                sx={{ ...buttonStyles("#FFDA55", "#02216F") }}
              >
                Review
              </Button>}
              <Button
                variant="contained"
                fullWidth
                onClick={handelClick}
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
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    mb: 1,
                    fontSize: {
                      xs: "14px",
                      sm: "16px",
                      md: "18px",
                      lg: "20px",
                    },
                  }}
                >
                  Result
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      // gap: '30px',
                      // p: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {rewards.map((reward, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        padding={1}
                        width="100%"
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: {
                              xs: "12px",
                              sm: "13px",
                              md: "15px",
                              lg: "15px",
                            },
                          }}
                        >
                          {reward.label}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: {
                                xs: "12px",
                                sm: "13px",
                                md: "15px",
                                lg: "15px",
                              },
                            }}
                          >
                            {reward.value}
                          </Typography>
                          <Box
                            component="img"
                            src={IQCoinIcon}
                            alt="coin"
                            width={20}
                            height={20}
                          />
                        </Box>
                      </Box>
                    ))}

                    <Divider
                      orientation="horizontal"
                      sx={{
                        borderBottomWidth: "3px",
                        borderColor: "black",
                        width: "100%",
                      }}
                    />
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding={1}
                      width="100%"
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {totalCoins}
                        </Typography>
                        <Box
                          component="img"
                          src={IQCoinIcon}
                          alt="coin"
                          width={20}
                          height={20}
                        />
                      </Box>
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
