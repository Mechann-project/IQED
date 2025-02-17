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
  useGetQuizSessionMutation,
  useUpdateQuizSessionMutation,
} from "../../../Redux/API/Quiz.Api";
import { useAddXPMutation, useGetUserQuery } from "../../../Redux/API/User.Api";

const useHandleQuizPage = () => {
  const [ getQuizSession, {
    data: sessionData,
    error: sessionError,
    isLoading: sessionLoading,
  }] = useGetQuizSessionMutation();
  const [updateQuizSession, { data }] = useUpdateQuizSessionMutation();
  const [updateUserXP] = useAddXPMutation();
  const { data: userData } = useGetUserQuery();

  const UserData = useSelector((state) => state.UserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizState = useSelector((state) => state.QuizState);
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const [quizAllCompleted, setQuizAllCompleted] = useState(false);
  const timerRef = useRef();
  const [Totalxp, setTotalxp] = useState(0);
  useEffect(() => {
    if (sessionError) {
      toast.error("Session Expired");
      navigate("/missions");
    }
  }, [sessionError, navigate]);
  console.log("setQuizAllCompleted", quizAllCompleted)
  console.log("quizState", quizState)

  useEffect(() => {
    if (
      quizState._id && quizState.isLive &&
      quizState?.questionsList.length ==
        Object.keys(quizState.answeredQuestions).length
    ) {
      console.log("setQuizAllCompleted", quizAllCompleted)
      toast.success("All Quiz Completed");
      setQuizAllCompleted(true);
      setisQuestionList(true);
    }
  }, [quizState.answeredQuestions]);
  

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
        // timeTaken:(quizState?.type=="Challenge"?quizState?.Challenge?.TestTime*60:   quizState?.questionsList.length * 60)-currentTime
        timeTaken:( quizState?.type == "Challenge" ? quizState?.Challenge?.TestTime * 60 : quizState?.careerPath?.Lesson == "679d3fd96aeede5b160420aa" ? 3 * 60 : quizState?.questionsList.length * 60)-currentTime
      }).unwrap().then((session) => {
        console.log("ddddd",session); 
        setTotalxp((session.score* 10)+20);
        dispatch(submitQuiz());
        setResultDialog(true);
        updateUserXP({ xp: (session.score* 10)+20}).then(() => {
          dispatch(UpdateUser(userData));
        });
        toast.success("Session Completed");
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
    quizAllCompleted,
    handleSubmit,
    handleQuit,
    handleOnNext,
    handleOnPrevious,
    setisQuestionList,
    setResultDialog,
    
  };
};

export default useHandleQuizPage;
