import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://iqed-backend.vercel.app/user",
    baseUrl: "http://localhost:3000/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postFeedback: builder.mutation({
      query: (formData) => ({
        url: "/feedback",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { usePostFeedbackMutation } = feedbackApi;
