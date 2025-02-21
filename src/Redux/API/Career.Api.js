import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BaseAPIUrl } from "../../../Web.Config";

export const CareerApi = createApi({
  reducerPath: "CareerApi",
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
    getCourses: builder.query({
      query: () => `/Careerpath`,
    }),
    getTopicsAll: builder.query({
      query: () => `/topicsall`,
    }),
    getUnlockedTopics: builder.query({
      query: () => `/unlockedtopics`,
    }),
  }),
});

export const { useGetCoursesQuery,useGetTopicsAllQuery ,useGetUnlockedTopicsQuery} = CareerApi;
