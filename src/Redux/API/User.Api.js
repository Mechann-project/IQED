import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
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
  tagTypes: ["User","challenge"],
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
    UpdateChallenge: builder.mutation({
      query: (data) => ({
        url: "challengeUpdate",
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
    CraeteOrder: builder.mutation({
      query: (data) => ({
        url: "orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["challenge"],
    }),
    getleaderboard: builder.query({
      query: () => ({ url: `leaderboard` }),
      invalidatesTags: ["User"],
    }),
    getChallenge: builder.query({
      query: () => ({ url: `challenge` }),
      providesTags: ["challenge"],
    }),
    getChallengeById: builder.query({
      query: (productId) => ({ url: `challenge/${productId}` }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useAddXPMutation,
  useAddGEMMutation,
  useGetleaderboardQuery,
  useGetChallengeQuery,
  useUpdateChallengeMutation,
  useGetChallengeByIdQuery,
  useCraeteOrderMutation
} = UserApi;
