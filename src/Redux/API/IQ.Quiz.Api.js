import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IQQuizApi = createApi({
  reducerPath: "IQQuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/IQ",
    // baseUrl: "https://iqed-backend.vercel.app/IQ",
    // baseUrl: "https://iqed-backend1-five.vercel.app/IQ",
    credentials: "include",
  }
),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: ({Age}) => ({
        url: "/createSession",
        method: "POST",
        body: { questionCount: 35,Age },
      }),
    }),
    getQuizSession: builder.mutation({
      query: () => ({
        url: "/getSession",
        method: "POST",
        body: { 
          sessionId:sessionStorage.getItem("IQSessionID"),
        },
      }),
    }),
    updateQuizSession: builder.mutation({
      query: ({ answeredQuestions, timeTaken }) => ({
        url: `/updateAnswers`,
        method: "PUT",
        body: {IQUserId:sessionStorage.getItem("IQUser"), answeredQuestions, timeTaken , sessionId:sessionStorage.getItem("IQSessionID")},
      }),
    }),
    uploadFile: builder.mutation({
      query: ({ blob, email, name, filename, sessionId }) => {
        const formData = new FormData();
        formData.append('file', blob, filename); // Add the file
        formData.append('email', email);        // Add email
        formData.append('name', name);          // Add name
        formData.append('sessionId', sessionId); // Add session ID
        return {
          url: '/SendEmail',
          method: 'POST',
          body: formData, // Send the FormData object
        };
      },
    }),
    verifyUser: builder.mutation({
      query: (credentials) => ({
        url: '/IQUsersVerify',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateIQ: builder.mutation({
      query: ({ userId, iqId }) => ({
        url: `/update-iq`,
        method: 'POST',
        body: {userId, iqId },
      }),
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionMutation,
  useUpdateQuizSessionMutation,
  useUploadFileMutation,
  useVerifyUserMutation,
  useUpdateIQMutation,
} = IQQuizApi;
