import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  nextQuestion,
  prevQuestion,
  setTimer,
  submitQuiz,
} from "../../../Redux/Slice/QuizSlice/QuizSlice";
import { UpdateUser } from "../../../Redux/Slice/UserSlice/UserSlice";
import {
  useGetQuizSessionQuery,
  useUpdateQuizSessionMutation,
} from "../../../Redux/API/Quiz.Api";
import { useAddXPMutation, useGetUserQuery } from "../../../Redux/API/User.Api";

const useHandleQuizPage = () => {
  const {
    data: sessionData,
    error: sessionError,
    isLoading: sessionLoading,
  } = useGetQuizSessionQuery();
  const [updateQuizSession, { data }] = useUpdateQuizSessionMutation();
  const [updateUserXP] = useAddXPMutation();
  const { data: userData } = useGetUserQuery();

  const UserData = useSelector((state) => state.UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizState = useSelector((state) => state.QuizState);
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const timerRef = useRef();
  const [Totalxp, setTotalxp] = useState(0);
  useEffect(() => {
    if (sessionError) {
      toast.error("Session Expired");
      navigate("/missions");
    }
  }, [sessionError, navigate]);

  const handleOnPrevious = () => {
    dispatch(prevQuestion());
  };

  const handleOnNext = () => {
    dispatch(nextQuestion());
  };

  const handleQuit = (test = false) => {
    setResultDialog(false);
    document.exitFullscreen();
    if (test) {
      toast.success("Quiz Completed");
    } else {
      toast.error("Session Expire");
    }
    navigate("/missions");
  };

  const handleSubmit = async () => {
    timerRef.current.pauseTimer();
    const currentTime = timerRef.current.getCurrentTime();
    dispatch(setTimer(currentTime));

    
    try {
      updateQuizSession({
        answeredQuestions: quizState.answeredQuestions,
        timeTaken:currentTime
      }).unwrap().then(() => {
        let xp = 0
        xp += quizState.score *2 
        xp +=  Math.floor((25 - (quizState.timeTaken/60)) * 1)
        setTotalxp(xp);
        dispatch(submitQuiz());
        setResultDialog(true);
        updateUserXP({ xp: xp }).then(() => {
          dispatch(UpdateUser(userData));
        });
        toast.success("session Complated");
      });
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
    // document.exitFullscreen();
  };

  const progressValue =
    (quizState?.answeredQuestions.length / quizState?.questionsList.length) *
    100;

  return {
    Totalxp,
    quizState,
    sessionError,
    sessionLoading,
    timerRef,
    isQuestionList,
    ResultDialog,
    progressValue,
    handleSubmit,
    handleQuit,
    handleOnNext,
    handleOnPrevious,
    setisQuestionList,
    setResultDialog,
  };
};

export default useHandleQuizPage;
