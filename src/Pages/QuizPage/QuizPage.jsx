import { useParams } from "react-router-dom";

// mui
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { ResultDialogBox, Timer } from "../../Common";

// hook
import { useHandleQuizPage } from "../util";

import {
  LoadingScreen,
  QuestionBox,
  QuestionDrawerList,
  QuizProgressBar,
} from "../../Components";
import { useGetQuizSessionQuery } from "../../Redux/API/Quiz.Api";

const QuizPage = () => {
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

  if (isLoading) {
    return <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>;
  }

  return (
    <Box sx={{ height: "100%" }}>
      <Timer
        ref={timerRef}
        initialTime={quizState?.questionsList.length * 60}
        start={!sessionLoading}
      />
      <QuestionDrawerList
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
          top: { lg: "40%", md: "35%", xs: "5%" },
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
