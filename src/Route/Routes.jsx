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
  PageNotFound,
} from "../Pages";
import UserLayout from "../Pages/Layout/UserLayout";
import MatchLayout from "../Pages/Layout/MatchLayout";
import { OnLoadLobby } from "../Pages/GamePage/MatchPage/MatchLobby";
import QuizLayout from "../Pages/Layout/QuizLayout";
import GQSuccessPage from "../Pages/IQQuizPage/GQResultPage";
import { Shipping } from "../Components";
import OrdersPage from "../Components/Store/OrderDetail";
import StoreOrderLayout from "../Pages/Layout/StoreOrderLayout";
import YourOrders from "../Components/Store/YourOrders";
import OrderDetail from "../Components/Store/OrderDetail";
import IQQuizLayout from "../Pages/Layout/IQQuizLayout";
import IQQuizPage from "../Pages/IQQuizPage/IQQuizPage";

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<AuthPage />} />

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
            <Route path="Orders" element={<StoreOrderLayout />}>
              <Route index element={<YourOrders />} />
              <Route path=":orderId" element={<OrderDetail />} />
            </Route>
          </Route>
        </Route>
        <Route path="quiz" element={<Outlet />}>
          <Route path=":sessionId" element={<QuizLayout />}>
            <Route index element={<QuizPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="IQquiz" element={<Outlet />}>
        <Route path=":sessionId" element={<IQQuizLayout />}>
          <Route index element={<IQQuizPage />} />
          <Route path="result" element={<GQSuccessPage />} />
        </Route>
      </Route>
      <Route path="match" element={<MatchLayout />}>
        <Route path=":GameCode" element={<Outlet />}>
          <Route index element={<MatchLobby />} loader={OnLoadLobby} />
          <Route path=":GameSessionId" element={<MPQuizPage />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound/>} />
    </Route>
  )
);
