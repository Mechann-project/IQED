import { createSlice } from "@reduxjs/toolkit";
import { IQQuizApi } from "../../API/IQ.Quiz.Api"; // Import the API slice

const initialState = {
  _id:null,
  name:"",
  email:"",
  status: "",
  questionsList: [],
  currentQuestionIndex: 0,
  answeredQuestions: [],
  questionCount: 0,
  score: 0,
  IQscore: 0,
  isLive: true,
  timeTaken: 0,
};

const IQQuizSlice = createSlice({
  name: "IQQuizState",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questionsList = action.payload;
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
      if (state.currentQuestionIndex < state.questionsList.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
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
      state.currentQuestionIndex = 0;
      state.answeredQuestions = [];
      state.score = 0;
      state.isLive = true;
    },
    submitQuiz: (state) => {
      state.status = "completed";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      IQQuizApi.endpoints.getQuizSession.matchFulfilled,
      (state, action) => {
        Object.assign(state,action.payload);
        state.isLive = (action.payload.status != "completed");
      }
    );
    builder.addMatcher(
      IQQuizApi.endpoints.updateQuizSession.matchFulfilled,
      (state, action) => {
        const data = action.payload;
        console.log(data);
        Object.assign(state,data);
      }
    );
  },
});


export const {
  setQuestions,
  answerQuestion,
  nextQuestion,
  prevQuestion,
  resetQuiz,
  submitQuiz,
  setQuestionIndex,
  setTimer,
  setTotalxp
} = IQQuizSlice.actions;

export default IQQuizSlice;
