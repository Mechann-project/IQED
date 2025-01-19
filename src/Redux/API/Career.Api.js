import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CareerApi = createApi({
  reducerPath: "CareerApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://iqed-backend1-five.vercel.app/career" }), // Adjust your base URL
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/career" }), 
  baseQuery: fetchBaseQuery({ baseUrl: "https://iqed-backend.vercel.app/career" }), 
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => `/courses/678bdccd39053772c9f9313a`,
    }),
  }),
});

export const { useGetCoursesQuery } = CareerApi;
