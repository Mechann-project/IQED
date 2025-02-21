import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseAPIUrl } from '../../../Web.Config';

export const GameApi = createApi({
  reducerPath: 'GameApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BaseAPIUrl}/game` }), // Fixed this
  tagTypes: ["Game"], 
  endpoints: (builder) => ({
    getGameSession: builder.mutation({  // Can be a query if it's just fetching data
      query: ({ GameSessionId, SocketId }) => ({
        url: `/Get`,
        method: 'POST',
        body: { GameSessionId, SocketId },  
      }),
      // Removed `providesTags`, since mutations don't typically use it.
    }),
    updateGameSessionAnswers: builder.mutation({
      query: ({ GameSessionId, SocketId, answeredQuestions, timeTaken }) => ({
        url: `/update`,
        method: 'POST',
        body: { GameSessionId, SocketId, answeredQuestions, timeTaken }, 
      }),
      invalidatesTags: ["Game"], // This correctly invalidates cache when data changes
    }),
  }),
});

export const { useGetGameSessionMutation, useUpdateGameSessionAnswersMutation } = GameApi;
