import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// MUI
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

// Components and Hooks
import { ResultDialogBox, Timer } from "../../Common";

import {
  LoadingScreen,
  QuestionBox,
  QuestionDrawerList,
  Quizloader,
  QuizProgressBar,
  VSCard,
} from "../../Components";
import MPQuizloader from "./MPQuizloader";
import { useHandleGamePage } from "../util";
import { useSelector } from "react-redux";

import { useGetQuizSessionQuery } from "../../Redux/API/Quiz.Api";
const QuizPage = () => {
  const GameData = useSelector((state) => state.GameState);

  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const {
    GameSessionState,
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
  } = useHandleGamePage({ GameSessionId: GameData?.SessionID });

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
  console.log(GameSessionState);

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
      <Timer ref={timerRef} initialTime={25 * 60} start={!sessionLoading} isMP />
      <VSCard />
      <QuestionDrawerList
        sessionState={GameSessionState}
        open={isQuestionList}
        handleClose={() => setisQuestionList(false)}
        quizData={GameSessionState?.questionsList}
        handleSubmit={handleSubmit}
        handleQuit={() => handleQuit()}
      />
      <Button
        sx={{
          position: "fixed",
          left: "-2px",
          top: { lg: "40%", xs: "10%", sm: "10%" },
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
        index={GameSessionState?.currentQuestionIndex}
        Question={
          GameSessionState?.questionsList[
            GameSessionState?.currentQuestionIndex
          ]
        }
      />
      <QuizProgressBar
        currentQuestion={GameSessionState?.currentQuestionIndex + 1}
        totalQuestions={GameSessionState?.questionsList.length}
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
