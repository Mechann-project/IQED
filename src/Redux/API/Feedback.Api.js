import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://iqed-backend.vercel.app/user",
    baseUrl: "http://localhost:3000/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
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
