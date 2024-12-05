import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IQQuizApi = createApi({
  reducerPath: "IQQuizApi",
  baseQuery: fetchBaseQuery({
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
    uploadFile: builder.mutation({
      query: (data) => {
        return {
          url: "/upload",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionQuery,
  useUpdateQuizSessionMutation,
  useUploadFileMutation,
} = IQQuizApi;
