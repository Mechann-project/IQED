import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/user",
    baseUrl: "https://iqed-backend.vercel.app/user",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    GetUser: builder.query({
      query: () => ({ url: `get` }),
      providesTags: ["User"],
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addXP: builder.mutation({
      query: (data) => ({
        url: "xp",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addGEM: builder.mutation({
      query: (data) => ({
        url: "iqgem",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getleaderboard: builder.query({
      query: () => ({ url: `leaderboard` }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useAddXPMutation,
  useAddGEMMutation,
  useGetleaderboardQuery
} = UserApi;
