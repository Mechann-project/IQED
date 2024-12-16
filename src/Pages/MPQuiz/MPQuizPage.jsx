import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// MUI
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

// Components and Hooks
import { MPResultDialogBox, ResultDialogBox, Timer, VSCard } from "../../Common";

import { useHandleGamePage } from "../util";
import { useDispatch, useSelector } from "react-redux";
import {MPQuestionDrawerList,MPQuestionBox,Quizloader, MPQuizProgressBar} from "../../Components";
import { setTotalxp } from "../../Redux/Slice/GameSlice/GameSessionSlice";

const MPQuizPage = () => {
  const GameData = useSelector((state) => state.GameState);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const {
    Totalxp,
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
      <Timer
        ref={timerRef}
        initialTime={25 * 60}
        start={!sessionLoading}
        isMP
      />
      <VSCard />
      <MPQuestionDrawerList
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
      <MPQuestionBox
        index={GameSessionState?.currentQuestionIndex}
        Question={
          GameSessionState?.questionsList[
            GameSessionState?.currentQuestionIndex
          ]
        }
      />
      <MPQuizProgressBar
        currentQuestion={GameSessionState?.currentQuestionIndex + 1}
        totalQuestions={GameSessionState?.questionsList.length}
        progressValue={progressValue}
        onPrevious={handleOnPrevious}
        onNext={handleOnNext}
      />
      <MPResultDialogBox
        SessionState={GameSessionState}
        // open={ResultDialog}
        open={ResultDialog}
        handleReview={() => setResultDialog(false)}
        handleDone={() => handleQuit(true)}
        Totalxp ={Totalxp}
      />
    </Box>
  );
};

export default MPQuizPage;
