import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import RootLayout from "../Pages/Layout/RootLayout";
import {
  LandingPage,
  AuthPage,
  PageNotFound,
  ExplorePage,
  MissionPage,
  GamePage,
  ProfilePage,
  LeaderboardPage,
  FeedBackPage,
  StorePage,
  QuizPage,
  MatchLobby,
  MPQuizPage,
  Forget,
} from "../Pages";
import GQSuccessPage from "../Pages/IQQuizPage/GQResultPage";
import GQSuccessPage1 from "../Pages/IQQuizPage/GQResultPage1";
import GQSuccessPage2 from "../Pages/IQQuizPage/GQResultPage2";
import IQQuizLayout from "../Pages/Layout/IQQuizLayout";
import IQQuizPage from "../Pages/IQQuizPage/IQQuizPage";
import { AuthLayout, MatchLayout, QuizLayout, StoreOrderLayout, UserLayout } from "../Pages/Layout";
import { OrderDetail, Shipping, YourOrders } from "../Components";
import { OnLoadLobby } from "../Pages/GamePage/MatchPage/MatchLobby";

const basename = import.meta.env.BASE_URL;
export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="forget/:id/:token" element={<Forget />} />
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
      <Route path="match" element={<MatchLayout />}>
        <Route path=":GameCode" element={<Outlet />}>
          <Route index element={<MatchLobby />} loader={OnLoadLobby} />
          <Route path=":GameSessionId" element={<MPQuizPage />} />
        </Route>
      </Route>
      <Route path="IQquiz" element={<Outlet />}>
        <Route path=":sessionId" element={<IQQuizLayout />}>
          <Route index element={<IQQuizPage />} />
          <Route path="result" element={<GQSuccessPage1 />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>

  )
  // ,
  // { basename }

);
