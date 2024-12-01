import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const QuizApi = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/quiz",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: ({ topicId, questionCount }) => ({
        url: "/createSession",
        method: "POST",
        body: { topicId, questionCount },
      }),
    }),
    getQuizSession: builder.query({
      query: () => `/getSession`,
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
  useGetQuizSessionQuery,
  useUpdateQuizSessionMutation,
} = QuizApi;
