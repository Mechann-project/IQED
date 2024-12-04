import { createSlice } from "@reduxjs/toolkit";
import { QuizApi } from "../../API/Quiz.Api"; // Import the API slice

const initialState = {
  host: "",
  status: "",
  questionsList: [],
  Topics: "",
  currentQuestionIndex: 0,
  answeredQuestions: [],
  questionCount: 0,
  score: 0,
  isLive: true,
  timeTaken: 0,
  Totalxp: 0,
};

const QuizSlice = createSlice({
  name: "QuizState",
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
      state.isLive = false;
      state.status = "completed";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      QuizApi.endpoints.getQuizSession.matchFulfilled,
      (state, action) => {
        const { questionsList, answeredQuestions, status, score } =
          action.payload;
        state.questionsList = questionsList;
        state.answeredQuestions = answeredQuestions;
        state.score = score;
        state.status = status;
        state.isLive = status != "completed";
      }
    );
    builder.addMatcher(
      QuizApi.endpoints.updateQuizSession.matchFulfilled,
      (state, action) => {
        const data = action.payload;
        Object.assign(state,data);
        console.log(data)
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
} = QuizSlice.actions;

export default QuizSlice;
