import { TroubleshootSharp } from "@mui/icons-material";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const QuizApi = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://iqed-backend1-five.vercel.app/quiz",
    baseUrl: "http://localhost:3000/quiz",
    // baseUrl: "https://iqed-backend.vercel.app/quiz",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: ({ levelid, lessonid, topicId, questionCount }) => ({
        url: "/createSession",
        method: "POST",
        body: { levelid, lessonid, topicId, questionCount },
      }),
    }),
    createChallengeSession: builder.mutation({
        query: ({ levelid, lessonid, topicId, questionCount, Type="Challenge",ChallengeId}) => ({
        url: "/createSession",
        method: "POST",
        body: { levelid, lessonid, topicId, questionCount ,Type,ChallengeId},
      }),
    }),
    getQuizSession: builder.mutation({
      query: () => ({
        url: "/getSession",
        method: "POST",
        body: {
          sessionId: sessionStorage.getItem("QuizSessionID"),
        },
      }),
    }),
    updateQuizSession: builder.mutation({
      query: ({ answeredQuestions, timeTaken }) => ({
        url: `/updateAnswers`,
        method: "PUT",
        body: {
          sessionId: sessionStorage.getItem("QuizSessionID"),
          answeredQuestions,
          timeTaken,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionMutation,
  useUpdateQuizSessionMutation,
  useCreateChallengeSessionMutation
} = QuizApi;
