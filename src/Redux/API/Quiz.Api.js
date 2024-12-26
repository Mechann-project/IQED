import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const QuizApi = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://iqed-backend1-five.vercel.app/quiz",
    baseUrl: "http://localhost:3000/quiz",
    credentials: "include",
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
        body: { answeredQuestions,timeTaken },
      }),
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionMutation,
  useUpdateQuizSessionMutation,
} = QuizApi;
