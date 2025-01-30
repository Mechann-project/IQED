import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const GameApi = createApi({
  reducerPath: 'GameApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://iqed-backend1-five.vercel.app/game' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/game' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://iqed-backend.vercel.app/game' }),
  tagTypes: ["Game"], // Ensure correct backend URL
  endpoints: (builder) => ({
    getGameSession: builder.mutation({
      query: ({ GameSessionId, SocketId }) => ({
        url: `/Get`,  // Use the POST /Get route
        method: 'POST',
        body: { GameSessionId, SocketId },  // Pass the GameSessionId and index
      }),
      providesTags: ["Game"],
    }),
    updateGameSessionAnswers: builder.mutation({
      query: ({ GameSessionId, SocketId, answeredQuestions, timeTaken }) => ({
        url: `/update`,  // Use the POST /update route
        method: 'POST',
        body: { GameSessionId, SocketId, answeredQuestions, timeTaken },  // Send the game session details
      }),
      invalidatesTags: ["Game"],
    }),

  }),
});

export const { useGetGameSessionMutation, useUpdateGameSessionAnswersMutation } = GameApi;
