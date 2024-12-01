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
        dispatch(submitQuiz());
        setResultDialog(true);
        console.log(data);
        toast.success("session Complated");
      });
      updateUserXP({ xp:  100 }).then(() => {
        dispatch(UpdateUser(userData));
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
