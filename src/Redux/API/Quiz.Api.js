import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const QuizApi = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://iqed-backend1-five.vercel.app/quiz",
    baseUrl: "http://localhost:3000/quiz",
    // baseUrl: "https://iqed-backend.vercel.app/quiz",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: ({ sectionIndex ,lessonIndex ,topicIndex,topicId, questionCount }) => ({
        url: "/createSession",
        method: "POST",
        body: { sectionIndex ,lessonIndex ,topicIndex,topicId, questionCount},
      }),
    }),
    getQuizSession: builder.mutation({
      query: () => ({
        url: "/getSession",
        method: "POST",
        body: { 
          sessionId:sessionStorage.getItem("QuizSessionID"),
        },
      }),
    }),
    updateQuizSession: builder.mutation({
      query: ({ answeredQuestions,timeTaken }) => ({
        url: `/updateAnswers`,
        method: "PUT",
        body: {sessionId:sessionStorage.getItem("QuizSessionID"), answeredQuestions,timeTaken },
      }),
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionMutation,
  useUpdateQuizSessionMutation,
} = QuizApi;
