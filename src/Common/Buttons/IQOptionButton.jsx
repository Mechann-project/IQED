import { Box, Typography,useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, nextQuestion } from "../../Redux/Slice/IQQuizSlice/IQQuizSlice";

const IQOptionButton = ({ quiz, type = "text", content ,index}) => {
  const IQQuizState = useSelector((state) => state.IQQuizState);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  // Determine the button background and text color based on the quiz state
  const isAnswered = IQQuizState?.answeredQuestions[IQQuizState.currentQuestionIndex]?.answer ==  content;
  const isCorrectAnswer = IQQuizState?.answeredQuestions[index]?.correct;
  const isLive = IQQuizState?.isLive;
  const backgroundColor = isAnswered && !isLive && isCorrectAnswer
    ? "#19ff95" 
    : isAnswered
    ? "#ff6334"
    : isCorrectAnswer && !isLive
    ? "#81f319ba" 
    : "#02216F"; 
  const color = isAnswered || (isCorrectAnswer && !isLive)
    ? "#02216F" 
    : "#ffffff"; 
    
  return (
    <Box
      component={"button"}
      sx={{
        height: { xs: "4rem", lg: "7rem", md: "6rem" },
        width: "100%",
        display: "flex",
        backgroundColor:!isLive ? backgroundColor: isAnswered?"#FFDA55":"#02216F" ,
        color,
        borderRadius: "10px",
        justifyContent: "center",
        alignItems: "center",
        border: 'none',
        boxShadow: isAnswered ? "2px 3px #0b276b" : null,
        "&:hover": {
          transition: "transform 0.3s ease-in-out",
          transform: "translateY(-1px)",
          backgroundColor: "#FFDA55",
          boxShadow: "2px 3px #0b276b",
          color: "#02216F",
        },
      }}
      disabled={!isLive}
      onClick={() => {
        dispatch(answerQuestion({ questionId: quiz._id, answer:content,answerindex: index }));
        dispatch(nextQuestion());
        console.log(index);
      }}
    >
      {type === "text" ? (
        <Typography fontWeight={700} fontSize={20}>{content}</Typography>
      ) : (
        <img src={content} width={isSm?60:isMd?70:90} height={isSm?60:isMd?70:90} alt="Option" />
      )}
    </Box>
  );
};

export default IQOptionButton;
