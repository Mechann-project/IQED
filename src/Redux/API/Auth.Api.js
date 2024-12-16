import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://iqedbackend.vercel.app/auth",credentials:"include" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    checkEmailExists: builder.mutation({
      query: (data) => ({
        url: "checkEmailExists",
        method: "POST",
        body: data,
      }),
    }),
    sendEmailOTP: builder.mutation({
      query: (data) => ({
        url: "sendEmailOTP",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "verifyEmail",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckEmailExistsMutation,
  useSendEmailOTPMutation,
  useVerifyEmailMutation,
} = AuthApi;
