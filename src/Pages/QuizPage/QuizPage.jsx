import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { feedback, warning } from "../../assets";
// Components and Hooks
import { ResultDialogBox, Timer } from "../../Common";
import { useHandleQuizPage } from "../util";
import { useGetQuizSessionMutation } from "../../Redux/API/Quiz.Api";
import { useDispatch } from "react-redux";
import {
  LoadingScreen,
  QuestionBox,
  QuestionDrawerList,
  Quizloader,
  QuizProgressBar,
  VSCard,
} from "../../Components";
import { resetQuiz, setTotalxp } from "../../Redux/Slice/QuizSlice/QuizSlice";

const QuizPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [getQuizSession] = useGetQuizSessionMutation();

  // State for tab-switching warning and modal
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const dispatch = useDispatch();


  const {
    Totalxp,
    quizState,
    sessionLoading,
    ResultDialog,
    isQuestionList,
    progressValue,
    timerRef,
    quizAllCompleted,
    setisQuestionList,
    setResultDialog,
    handleOnPrevious,
    handleOnNext,
    handleQuit,
    handleSubmit,
  } = useHandleQuizPage();
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = ""; 
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const navigate = useNavigate();
 
  useEffect(() => {
    const isReload = sessionStorage.getItem("isReloaded");
    if (isReload && quizState._id) {
      sessionStorage.removeItem("isReloaded");
      console.log("Page was reloaded, and quizState._id is missing.")
    } else {
      sessionStorage.setItem("isReloaded", "true");
    }
  }, [navigate]);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (ResultDialog) {
        return;
      }
      if (document.hidden) {
        if (tabSwitchCount === 0) {
          setWarningMessage(
            "Please stay on this tab to complete the quiz. If you move to another tab again, your quiz will end, and your data will not be saved."
          );
          setTabSwitchCount((prev) => prev + 1);
          setOpenModal(true);
        } else {
          setWarningMessage(
            "Tab switching is not allowed. Your quiz is over, and your data is not saved."
          );
          setTabSwitchCount((prev) => prev + 1);
          setOpenModal(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchCount,ResultDialog]);

  const handleModalClose = () => {
    if (tabSwitchCount === 1) {
      setOpenModal(false);
    } else {
      handleQuit();
    }
  };

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
        SessionState={quizState}
        open={ResultDialog}
        handleReview={() => setResultDialog(false)}
        handleDone={() => handleQuit(true)}
        Totalxp={Totalxp}
      />
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              lg: "30%",
              md: "40%",
              sm: "70%",
              xs: "60%",
            },
            bgcolor: "background.paper",

            p: 4,
            borderRadius: 2,
            boxShadow: "2px 3px #FFDA55",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "end",
              boxSizing: "border-box",
              borderRadius: "5px",
              flexDirection: "row",
            }}
          >
            <Box
              component="img"
              src={warning}
              alt="Warning Icon"
              sx={{
                width: {
                  lg: "10%",
                  md: "20%",
                  sm: "20%",
                  xs: "15%",
                },
                height: "auto",
              }}
            />
            <Divider
              orientation="vertical"
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                height: { lg: "40px", md: "30px", sm: "30px", xs: "30px" },
                borderRadius: "20%",
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "1.5rem",
                  lg: "2rem",
                },
              }}
            >
              Warning
            </Typography>
          </Box>
          <Typography id="modal-description" sx={{ mt: 2, fontWeight: "bold" }}>
            {warningMessage}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleModalClose}
            sx={{
              fontWeight: "bold",
              // backgroundColor: "#1A49BA",
              backgroundColor: "#F44230",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "Black",
                boxShadow: "2px 3px #FFDA55",
              },
              // boxShadow: "2px 3px #1A49BA",
              boxShadow: "2px 3px #FFDA55",
              mt: 3,
            }}
          >
            {tabSwitchCount === 1 ? "OK" : "Retry"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default QuizPage;
