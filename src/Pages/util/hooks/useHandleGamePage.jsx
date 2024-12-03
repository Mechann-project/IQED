import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  nextQuestion,
  prevQuestion,
  setTimer,
  submitQuiz,
} from "../../../Redux/Slice/GameSlice/GameSessionSlice";
import { UpdateUser } from "../../../Redux/Slice/UserSlice/UserSlice";
import { useAddXPMutation, useGetUserQuery } from "../../../Redux/API/User.Api";
import {
  useGetGameSessionMutation,
  useUpdateGameSessionAnswersMutation,
} from "../../../Redux/API/Game.Api";

const useHandleGamePage = ({ GameSessionId }) => {
  const GameData = useSelector((state) => state.GameState);
  const GameSessionState = useSelector((state) => state.GameSessionState);
  console.log(GameData);

  const [getGameSession,{ data: sessionData, error: sessionError, isLoading: sessionLoading }] = useGetGameSessionMutation();
  const [updateQuizSession, { data }] = useUpdateGameSessionAnswersMutation();
  const [updateUserXP] = useAddXPMutation();
  const { data: userData } = useGetUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GameState = useSelector((state) => state.QuizState);
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    getGameSession({
      GameSessionId:GameData?.SessionID,
      SocketId: GameData?.Players[GameData?.index]?.SocketId,
    })
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
        answeredQuestions: GameSessionState.answeredQuestions,
        timeTaken: currentTime,
      })
        .unwrap()
        .then(() => {
          dispatch(submitQuiz());
          setResultDialog(true);
          console.log(data);
          toast.success("session Complated");
        });
      updateUserXP({ xp: 100 }).then(() => {
        dispatch(UpdateUser(userData));
      });
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
    // document.exitFullscreen();
  };

  const progressValue =
    (GameSessionState?.answeredQuestions.length /
      GameSessionState?.questionsList.length) *
    100;
console.log(sessionData);
  return {
    GameSessionState,
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

export default useHandleGamePage;
