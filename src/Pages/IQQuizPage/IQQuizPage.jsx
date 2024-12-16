import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

// Components and Hooks
import { ResultDialogBox, Timer } from "../../Common";
import { useHandleIQQuizPage } from "../util";
import { useGetQuizSessionMutation } from "../../Redux/API/IQ.Quiz.Api";
import { useDispatch } from "react-redux";
import {
  IQQuestionDrawerList,
  IQQuestionBox,
  IQQuizProgressBar,
  Quizloader,
} from "../../Components";
import toast from "react-hot-toast";

const IQQuizPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [getQuizSession] = useGetQuizSessionMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const {
    IQQuizState,
    sessionLoading,
    isQuestionList,
    progressValue,
    timerRef,
    quizAllCompleted,
    setisQuestionList,
    handleOnPrevious,
    handleOnNext,
    handleQuit,
    handleSubmit,
  } = useHandleIQQuizPage();
  const dispatch = useDispatch();
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
    getQuizSession();
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
      <Timer ref={timerRef} initialTime={25 * 60} start={!sessionLoading} />
      <IQQuestionDrawerList
        sessionState={IQQuizState}
        open={isQuestionList}
        handleClose={() => setisQuestionList(false)}
        quizData={IQQuizState?.questionsList}
        handleSubmit={handleSubmit}
        handleQuit={() => handleQuit()}
        quizAllCompleted={quizAllCompleted}
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

      <IQQuestionBox
        index={IQQuizState?.currentQuestionIndex}
        Question={IQQuizState?.questionsList[IQQuizState?.currentQuestionIndex]}
      />
      <IQQuizProgressBar
        currentQuestion={IQQuizState?.currentQuestionIndex + 1}
        totalQuestions={IQQuizState?.questionsList.length}
        progressValue={progressValue}
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
        handleSubmit={handleSubmit}
      />
      {/* <ResultDialogBox
        SessionState={quizState}
        open={ResultDialog}
        handleReview={() => setResultDialog(false)}
        handleDone={() => handleQuit(true)}
        Totalxp ={Totalxp}
      /> */}
    </Box>
  );
};

export default IQQuizPage;
