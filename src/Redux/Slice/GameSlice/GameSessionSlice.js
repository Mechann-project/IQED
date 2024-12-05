import { createSlice } from "@reduxjs/toolkit";
import { GameApi } from "../../API/Game.Api";

const initialState = {
  Players: [],
  SocketId: "",
  status: "",
  questionsList: [],
  Topics: "",
  currentQuestionIndex: 0,
  answeredQuestions: [],
  questionCount: 0,
  score: 0,
  Winner: 0,
  isLive: true,
  timeTaken: 0,
  Totalxp: 0,
};

const gameSessionSlice = createSlice({
    name: "gameSession",
    initialState: initialState,
    reducers: {
      setQuestions: (state, action) => {
        state.questionsList = action.payload;
      },
      setSession: (state, action) => {
        state.status = action.payload.status;
        state.Winner = action.payload.Winner;
      },
      answerQuestion: (state, action) => {
        const { questionId, answer, answerindex } = action.payload;
        const question = state.questionsList.find((q) => q._id === questionId);
        const isCorrect =
          question && question.correctAnswer.index === answerindex;
        state.answeredQuestions[state.currentQuestionIndex] = {
          questionId,
          answer,
          correct: isCorrect,
        };
      },
      setTimer: (state, action) => {
        state.timeTaken = action.payload;
      },
      nextQuestion: (state) => {
        if (
          state.questionsList.length > 0 &&
          state.currentQuestionIndex < state.questionsList.length - 1
        ) {
          state.currentQuestionIndex += 1;
        }
      },
      prevQuestion: (state) => {
        if (state.questionsList.length > 0 && state.currentQuestionIndex > 0) {
          state.currentQuestionIndex -= 1;
        }
      },
      setQuestionIndex: (state, action) => {
        state.currentQuestionIndex = action.payload;
      },
      setTotalxp: (state, action) => {
        state.Totalxp = action.payload;
      },
      resetQuiz: (state) => {
        return { ...initialState }; // Clean reset.
      },
      submitQuiz: (state) => {
        state.isLive = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(
          GameApi.endpoints.getGameSession.matchFulfilled,
          (state, action) => {
            console.log("Get", action.payload);
            Object.assign(state, action.payload);
          }
        )
        .addMatcher(
          GameApi.endpoints.updateGameSessionAnswers.matchFulfilled,
          (state, action) => {
            console.log("Get", action.payload);
            Object.assign(state, action.payload);
            state.isLive = false;
          }
        );
    },
  });
  

export const {
  setQuestions,
  answerQuestion,
  setTimer,
  nextQuestion,
  prevQuestion,
  setQuestionIndex,
  resetQuiz,
  submitQuiz,
  setTotalxp,
  setSession
} = gameSessionSlice.actions;

export default gameSessionSlice;
