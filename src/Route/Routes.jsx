import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";

import RootLayout from "../Pages/Layout/RootLayout";
import AuthLayout from "../Pages/Layout/AuthLayout";
import {
  LandingPage,
  AuthPage,
  ExplorePage,
  MissionPage,
  GamePage,
  MatchLobby,
  QuizPage,
  ProfilePage,
  LeaderboardPage,
  FeedBackPage,
  StorePage,
  MPQuizPage,
} from "../Pages";
import UserLayout from "../Pages/Layout/UserLayout";
import MatchLayout from "../Pages/Layout/MatchLayout";
import { OnLoadLobby } from "../Pages/GamePage/MatchPage/MatchLobby";
import QuizLayout from "../Pages/Layout/QuizLayout";
import GQSuccessPage from "../Pages/QuizPage/GQResultPage";
import { Shipping } from "../Components";
import OrdersPage from "../Pages/Store/OrdersPage";
export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="Result" element={<GQSuccessPage />} />
      <Route element={<AuthLayout />}>
        <Route element={<UserLayout />}>
          <Route path="explore" element={<ExplorePage />} />
          <Route path="missions" element={<MissionPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="Leaderboard" element={<LeaderboardPage />} />
          <Route path="FeedBack" element={<FeedBackPage />} />
          <Route path="store" element={<Outlet />}>
            <Route index element={<StorePage />} />
            <Route path="shipping/:productId" element={<Shipping />} />
            <Route path="Orders" element={<OrdersPage />} />
          </Route>
        </Route>
        <Route path="quiz" element={<Outlet />}>
          <Route path=":sessionId" element={<QuizLayout />}>
            <Route index element={<QuizPage />} />
            <Route path="result" element={<></>} />
          </Route>
        </Route>
      </Route>

      <Route path="match" element={<MatchLayout />}>
        <Route path=":GameCode" element={<Outlet />}>
          <Route index element={<MatchLobby />} loader={OnLoadLobby} />
          <Route path=":GameSessionId" element={<MPQuizPage />} />
        </Route>
      </Route>
    </Route>
  )
);
