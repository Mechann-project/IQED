import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CareerApi = createApi({
  reducerPath: "CareerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/user",
    // baseUrl: "https://iqed-backend.vercel.app/user",
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
    getCourses: builder.query({
      query: () => `/Careerpath`,
    }),
  }),
});

export const { useGetCoursesQuery } = CareerApi;
