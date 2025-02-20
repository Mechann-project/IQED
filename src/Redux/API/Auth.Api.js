import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseAPIUrl } from "../../../Web.Config";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseAPIUrl}/auth`,
    credentials: "include",
  }),
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
    ForgetPassword: builder.mutation({
      query: (data) => ({
        url: "ForgetPassword",
        method: "POST",
        body: data,
      }),
    }),
    NewPassword: builder.mutation({
      query: (data) => ({
        url: "NewPassword",
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
  useForgetPasswordMutation,
  useNewPasswordMutation,
} = AuthApi;
