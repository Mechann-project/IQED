import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const GameApi = createApi({
  reducerPath: 'GameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/game' }), // Ensure correct backend URL
  endpoints: (builder) => ({
    getGameSession: builder.mutation({
      query: ({ GameSessionId, SocketId }) => ({
        url: `/Get`,  // Use the POST /Get route
        method: 'POST',
        body: { GameSessionId, SocketId },  // Pass the GameSessionId and index
      }),
    }),
    updateGameSessionAnswers: builder.mutation({
      query: ({ GameSessionId, SocketId, answeredQuestions, timeTaken }) => ({
        url: `/update`,  // Use the POST /update route
        method: 'POST',
        body: { GameSessionId, SocketId, answeredQuestions, timeTaken },  // Send the game session details
      }),
    }),
  }),
});

export const { useGetGameSessionMutation, useUpdateGameSessionAnswersMutation } = GameApi;
