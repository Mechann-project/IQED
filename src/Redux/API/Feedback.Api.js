import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BaseAPIUrl } from "../../../Web.Config";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseAPIUrl}/user`,
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
