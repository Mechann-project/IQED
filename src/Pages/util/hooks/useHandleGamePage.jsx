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
  const timerRef = useRef();
  const [Totalxp, setTotalxp] = useState(0);
  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;
    socket.on("game-ended", (data) => {
      console.log("game-ended",data);
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
          let xp = 0
          xp += GameSessionState.score *2 
          xp +=  Math.floor((25 - (GameSessionState.timeTaken/60)) * 1)
          setTotalxp(xp);
          dispatch(submitQuiz());
          setResultDialog(true);
          socket.emit("game-ended",{roomId:GameData?.RoomID ,GameSessionId:GameData?.SessionID})
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
    handleSubmit,
    handleQuit,
    handleOnNext,
    handleOnPrevious,
    setisQuestionList,
    setResultDialog,
  };
};

export default useHandleGamePage;
