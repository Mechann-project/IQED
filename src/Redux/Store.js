import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import UserSlice from "./Slice/UserSlice/UserSlice";
import QuizSlice from "./Slice/QuizSlice/QuizSlice";
import GameSlice from "./Slice/GameSlice/GameSlice";
import { AuthApi } from "./API/Auth.Api";
import { UserApi } from "./API/User.Api";
import { QuizApi } from "./API/Quiz.Api";
import { CareerApi } from "./API/Career.Api";

export const store = configureStore({
  reducer: {
    UserState: UserSlice.reducer,
    QuizState: QuizSlice.reducer,
    GameState: GameSlice.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [QuizApi.reducerPath]: QuizApi.reducer,
    [CareerApi.reducerPath]: CareerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, UserApi.middleware,QuizApi.middleware,CareerApi.middleware),
});

setupListeners(store.dispatch);
