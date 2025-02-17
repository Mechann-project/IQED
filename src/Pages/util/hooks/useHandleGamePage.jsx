import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  nextQuestion,
  prevQuestion,
  resetQuiz,
  setSession,
  setTimer,
  submitQuiz,
} from "../../../Redux/Slice/GameSlice/GameSessionSlice";
import { UpdateUser } from "../../../Redux/Slice/UserSlice/UserSlice";
import { useAddXPMutation, useGetUserQuery } from "../../../Redux/API/User.Api";
import {
  useGetGameSessionMutation,
  useUpdateGameSessionAnswersMutation,
} from "../../../Redux/API/Game.Api";
import { useSocket } from "../../../Socket/SocketContext";

const useHandleGamePage = ({ GameSessionId }) => {
  const GameData = useSelector((state) => state.GameState);
  const GameSessionState = useSelector((state) => state.GameSessionState);
  console.log(GameData);

  const [
    getGameSession,
    { data: sessionData, error: sessionError, isLoading: sessionLoading },
  ] = useGetGameSessionMutation();
  const [updateQuizSession, { data }] = useUpdateGameSessionAnswersMutation();
  const [updateUserXP] = useAddXPMutation();
  const { data: userData } = useGetUserQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isQuestionList, setisQuestionList] = useState(false);
  const [ResultDialog, setResultDialog] = useState(false);
  const [quizAllCompleted, setQuizAllCompleted] = useState(false);
  const timerRef = useRef();
  const [Totalxp, setTotalxp] = useState(0);
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on("game-ended", (data) => {
      console.log("game-ended", data);
      dispatch(setSession(data.GameSession));
    });
    return () => {
      socket.off("game-ended");
    };
  }, [socket]);
  useEffect(() => {
    getGameSession({
      GameSessionId: GameData?.SessionID,
      SocketId: GameData?.Players[GameData?.index]?.SocketId,
    });
    if (sessionError) {
      toast.error("Session Expired");
      navigate("/game");
    }
  }, [sessionError, navigate]);



  console.log("setQuizAllCompleted", quizAllCompleted)
  console.log("IQQuizState", GameSessionState)
  useEffect(() => {
    if (
      GameSessionState.SocketId && GameSessionState.isLive &&
      GameSessionState?.questionsList.length ==
        Object.keys(GameSessionState.answeredQuestions).length
    ) {
      console.log("setQuizAllCompleted", quizAllCompleted)
      toast.success("All Quiz Completed");
      setQuizAllCompleted(true);
      setisQuestionList(true);
    }
  }, [GameSessionState.answeredQuestions]);

  const handleOnPrevious = () => {
    dispatch(prevQuestion());
  };

  const handleOnNext = () => {
    dispatch(nextQuestion());
  };

  const handleQuit = (test = false) => {
    setResultDialog(false);
    document.exitFullscreen();
    dispatch(resetQuiz());
    if (test) {
      toast.success("Quiz Completed");
    } else {
      toast.error("Session Expire");
    }
    navigate("/game");
  };

  const handleSubmit = async () => {
    timerRef.current.pauseTimer();
    const currentTime = timerRef.current.getCurrentTime();
    dispatch(setTimer(currentTime));
    try {
      updateQuizSession({
        GameSessionId: GameData?.SessionID,
        SocketId: GameData?.Players[GameData?.index]?.SocketId,
        answeredQuestions: GameSessionState?.answeredQuestions,
        timeTaken: currentTime,
      })
      .unwrap()
      .then(() => {
        setTotalxp((GameSessionState.score * 10)+20);
         dispatch(submitQuiz());
          setResultDialog(true);
          socket.emit("game-ended", {
            roomId: GameData?.RoomID,
            GameSessionId: GameData?.SessionID,
          });
          updateUserXP({ xp: (GameSessionState.score * 10)+20 }).then(() => {
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
    (GameSessionState?.answeredQuestions.length /
      GameSessionState?.questionsList.length) *
    100;
  console.log(sessionData);
  return {
    Totalxp,
    GameSessionState,
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

export default useHandleGamePage;
