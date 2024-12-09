import { useEffect, useRef, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  nextQuestion,
  prevQuestion,
  setTimer,
  submitQuiz,
} from "../../../Redux/Slice/IQQuizSlice/IQQuizSlice";
import { UpdateUser } from "../../../Redux/Slice/UserSlice/UserSlice";
import {
  useGetQuizSessionQuery,
  useUpdateQuizSessionMutation,
} from "../../../Redux/API/IQ.Quiz.Api";


const useHandleIQQuizPage = () => {
  const {
    data: sessionData,
    error: sessionError,
    isLoading: sessionLoading,
  } = useGetQuizSessionQuery();
  const [updateQuizSession, { data }] = useUpdateQuizSessionMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const IQQuizState = useSelector((state) => state.IQQuizState);
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const timerRef = useRef();
  const [Totalxp, setTotalxp] = useState(0);
  useEffect(() => {
    if (sessionError) {
      toast.error("Session Expired");
      navigate("/");
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
    navigate("/");
  };

  const handleSubmit = async () => {
    timerRef.current.pauseTimer();
    const currentTime = timerRef.current.getCurrentTime();
    dispatch(setTimer(currentTime));

    
    try {
      updateQuizSession({
        answeredQuestions: IQQuizState.answeredQuestions,
        timeTaken:currentTime
      }).unwrap().then(() => {
        dispatch(submitQuiz());
        setResultDialog(true);
        toast.success("session Complated");
        navigate(`/IQquiz/${IQQuizState._id}/result`);
      });
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
    // document.exitFullscreen();
  };

  const progressValue =
    (IQQuizState?.answeredQuestions.length / IQQuizState?.questionsList.length) *
    100;

  return {
    Totalxp,
    IQQuizState,
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

export default useHandleIQQuizPage;
