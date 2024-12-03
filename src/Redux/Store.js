import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./Slice/UserSlice/UserSlice";
import QuizSlice from "./Slice/QuizSlice/QuizSlice";
import GameSlice from "./Slice/GameSlice/GameSlice";
import GameSessionSlice from "./Slice/GameSlice/GameSessionSlice";
import { AuthApi } from "./API/Auth.Api";
import { UserApi } from "./API/User.Api";
import { QuizApi } from "./API/Quiz.Api";
import { CareerApi } from "./API/Career.Api";
import { GameApi } from "./API/Game.Api";

export const store = configureStore({
  reducer: {
    UserState: UserSlice.reducer,
    QuizState: QuizSlice.reducer,
    GameState: GameSlice.reducer,
    GameSessionState: GameSessionSlice.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [QuizApi.reducerPath]: QuizApi.reducer,
    [CareerApi.reducerPath]: CareerApi.reducer,
    [GameApi.reducerPath]: GameApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, UserApi.middleware,QuizApi.middleware,CareerApi.middleware,GameApi.middleware),
});

setupListeners(store.dispatch);
