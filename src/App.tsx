import { Routes, Route, Navigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import AuthedLayout from "./components/layouts/AuthedLayout";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SelectGame from "./pages/SelectGame";
import SelectCategory from "./pages/SelectCategory";
import ScrambledWordsGame from "./pages/ScrambledWordsGame";
import CreateGameSession from "./pages/CreateGameSession";
import CreateGame from "./pages/CreateGame";
import Leaderboard from "./pages/Leaderboard";
import StartGame from "./pages/StartGame";
import JoinGame from "./pages/JoinGame";
import Landing from "./pages/Landing";
import Play from "./pages/Play";
import SelectDifficulty from "./pages/SelectDifficulty";
import LemonGame from "./pages/LemonGame";
// import Penalty from "./pages/Penalty";
// import ConfirmPenalty from "./pages/ConfirmPenalty";
import LemonResult from "./pages/LemonResult";
import GlobalLeaderboard from "./pages/GlobalLeaderboard";

import * as ROUTES from "./routes";
import GamesHistory from "./pages/GamesHistory";
import GameDetails from "./pages/GameDetails";

const socket: Socket = io(`${process.env.REACT_APP_BASE_URL}/game`);

socket.on("connect", () => {
  console.log("connected!");
});

socket.on("disconnect", () => {
  console.log("disconnected!");
});

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* <Route path="/current" element={<GameDetails />} /> */}
      <Route path={ROUTES.PLAY.GET_STARTED} element={<Play />} />
      <Route path={ROUTES.PLAY.PLAY_GAME} element={<Landing />} />
      <Route
        path={ROUTES.PLAY.START_GAME}
        element={<StartGame socket={socket} />}
      />
      <Route
        path={ROUTES.PLAY.LEADERBOARD}
        element={<Leaderboard socket={socket} />}
      />
      <Route path={ROUTES.PLAY.JOIN_GAME} element={<JoinGame />} />
      <Route path={ROUTES.PLAY.SELECT_CATEGORY} element={<SelectCategory />} />
      <Route
        path={ROUTES.PLAY.SELECT_DIFFICULTY}
        element={<SelectDifficulty />}
      />
      <Route
        path={ROUTES.PLAY.CREATE_GAME_SESSION}
        element={<CreateGameSession />}
      />
      <Route
        path={ROUTES.SCRAMBLED_WORDS.GAME}
        element={<ScrambledWordsGame socket={socket} />}
      />
      <Route path={ROUTES.LEMON.GAME} element={<LemonGame socket={socket} />} />
      <Route path={ROUTES.PLAY.PICK_GAME} element={<SelectGame />} />
      <Route
        path={ROUTES.LEMON.RESULT}
        element={<LemonResult socket={socket} />}
      />

      {/* <Route element={<UnauthedLayout />}> */}
      <Route path={ROUTES.AUTH.SIGNIN} element={<Login />} />
      <Route path={ROUTES.AUTH.SIGNUP} element={<SignUp />} />
      {/* </Route> */}

      <Route element={<AuthedLayout />}>
        <Route path={ROUTES.DASHBOARD.PROFILE} element={<Dashboard />} />
        <Route path={ROUTES.DASHBOARD.GAMES} element={<GamesHistory />} />
        <Route path={ROUTES.DASHBOARD.GAME_DETAILS} element={<GameDetails />} />
        <Route path={ROUTES.DASHBOARD.LEADERBOARD} element={<GlobalLeaderboard />} />

        <Route
          path={ROUTES.SCRAMBLED_WORDS.NEW_GAME}
          element={<CreateGame />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to={ROUTES.PLAY.GET_STARTED} replace />}
      />
    </Routes>
  );
}
