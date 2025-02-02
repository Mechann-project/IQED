import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, nextQuestion } from "../../Redux/Slice/GameSlice/GameSessionSlice";

const MPOptionButton = ({ quiz, type = "text", content, index }) => {
   const GameSessionState = useSelector((state) => state.GameSessionState);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [isAnimating, setIsAnimating] = useState(false);

  // Determine the button background and text color based on the quiz state
  const isAnswered = GameSessionState?.answeredQuestions[GameSessionState.currentQuestionIndex]?.answer == content;
  const isCorrectAnswer = GameSessionState?.answeredQuestions[index]?.correct;
  const iamSelected = GameSessionState?.answeredQuestions[index]?.answer == content;
  const isLive = GameSessionState?.isLive;
  const backgroundColor = !isLive? iamSelected  ? isCorrectAnswer? "#06b410":"#c90909":"#02216F": "#02216F";
  const color = iamSelected && isAnswered && isCorrectAnswer && !isLive ? "#02216F" : "#ffffff";

  const handleClick = () => {
    if (!isAnimating) {
      dispatch(
        answerQuestion({
          questionId: quiz._id,
          answer: content,
          answerindex: index,
        })
      );

      setIsAnimating(true); // Start animation lock
      setTimeout(() => {
        dispatch(nextQuestion());
        setIsAnimating(false); // Remove animation lock
      }, 900); // Delay matches the transition duration (in milliseconds)
    }
  };

  return (
    <Box
      component={"button"}
      sx={{
        height: { xs: "4rem", lg: "7rem", md: "6rem" },
        width: "100%",
        display: "flex",
        backgroundColor: !isLive ? backgroundColor : iamSelected ? "#FFDA55" : "#02216F",
        color,
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        boxShadow: iamSelected ? "2px 3px #0b276b" : null,
        "@media (hover: hover) and (pointer: fine)": {
          "&:hover": {
            transition: "transform 0.3s ease-in-out",
            transform: "translateY(-1px)",
            backgroundColor: "#FFDA55",
            boxShadow: "2px 3px white",
            color: "#02216F",
          },
        },
      }}
      disabled={!isLive || isAnimating} 
      onClick={handleClick}
    >
      {type === "text" ? (
        <Typography fontWeight={700} fontSize={20}>
          {content}
        </Typography>
      ) : (
        <img
          src={content}
          width={isSm ? 50 : isMd ? 60 : 90}
          height={isSm ? 50 : isMd ? 60 : 90}
          alt="Option"
          style={{
            borderRadius: "10px",
          }}
        />
      )}
    </Box>
  );
};

export default MPOptionButton;
