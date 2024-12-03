import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// MUI
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

// Components and Hooks
import { ResultDialogBox, Timer } from "../../Common";
import { useHandleQuizPage } from "../util";
import {
  LoadingScreen,
  QuestionBox,
  QuestionDrawerList,
  Quizloader,
  QuizProgressBar,
  VSCard,
} from "../../Components";
import { useGetQuizSessionQuery } from "../../Redux/API/Quiz.Api";

const QuizPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const { data, error, isLoading } = useGetQuizSessionQuery();
  const {
    quizState,
    sessionLoading,
    ResultDialog,
    isQuestionList,
    progressValue,
    timerRef,
    setisQuestionList,
    setResultDialog,
    handleOnPrevious,
    handleOnNext,
    handleQuit,
    handleSubmit,
  } = useHandleQuizPage();

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    enterFullscreen();
  }, []);

  useEffect(() => {
    if (!initialLoading) {
      setFadeIn(true);
    }
  }, [initialLoading]);

  if (initialLoading) {
    return (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <Quizloader onComplete={() => setInitialLoading(false)} />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    >
      <Timer
        ref={timerRef}
        initialTime={quizState?.questionsList.length * 60}
        start={!sessionLoading}
      />
      <QuestionDrawerList
        sessionState={quizState}
        open={isQuestionList}
        handleClose={() => setisQuestionList(false)}
        quizData={quizState?.questionsList}
        handleSubmit={handleSubmit}
        handleQuit={() => handleQuit()}
      />
      <Button
        sx={{
          position: "fixed",
          left: "-2px",
          top: { lg: "40%", xs: "3%", sm: "3%" },
          height: "50px",
          backgroundColor: "#ffffff30",
          color: "white",
        }}
        onClick={() => {
          setisQuestionList(true);
        }}
      >
        <KeyboardDoubleArrowRight />
      </Button>
      <QuestionBox
        index={quizState?.currentQuestionIndex}
        Question={quizState?.questionsList[quizState?.currentQuestionIndex]}
      />
      <QuizProgressBar
        currentQuestion={quizState?.currentQuestionIndex + 1}
        totalQuestions={quizState?.questionsList.length}
        progressValue={progressValue}
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
      />
      <ResultDialogBox
        open={ResultDialog}
        handleReview={() => setResultDialog(false)}
        handleDone={() => handleQuit(true)}
      />
    </Box>
  );
};

export default QuizPage;
