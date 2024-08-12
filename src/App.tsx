import { Routes, Route, Navigate } from "react-router-dom";

import UnauthedLayout from "./components/layouts/UnauthedLayout";
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
import LemonNumber from "./pages/LemonNumber";
import LemonGame from "./pages/LemonGame";
import Penalty from "./pages/Penalty";
import ConfirmPenalty from "./pages/ConfirmPenalty";

import * as ROUTES from "./routes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path={ROUTES.PLAY.GET_STARTED} element={<Play />} />
      <Route path={ROUTES.PLAY.PLAY_GAME} element={<Landing />} />
      <Route path={ROUTES.PLAY.START_GAME} element={<StartGame />} />
      <Route path={ROUTES.PLAY.LEADERBOARD} element={<Leaderboard />} />
      <Route path={ROUTES.PLAY.JOIN_GAME} element={<JoinGame />} />
      <Route path={ROUTES.PLAY.SELECT_CATEGORY} element={<SelectCategory />} />
      <Route path={ROUTES.PLAY.SELECT_DIFFICULTY} element={<SelectDifficulty />} />
      <Route path={ROUTES.PLAY.CREATE_GAME_SESSION} element={<CreateGameSession />} />
      <Route
        path={ROUTES.SCRAMBLED_WORDS.GAME}
        element={<ScrambledWordsGame />}
      />
      <Route
        path={ROUTES.LEMON.GAME}
        element={<LemonGame />}
      />
      <Route path={ROUTES.PLAY.PICK_GAME} element={<SelectGame />} />
      {/* <Route path="/current" element={<LemonGame />} /> */}

      {/* <Route element={<UnauthedLayout />}> */}
      <Route path={ROUTES.AUTH.SIGNIN} element={<Login />} />
      <Route path={ROUTES.AUTH.SIGNUP} element={<SignUp />} />
      {/* </Route> */}

      <Route element={<AuthedLayout />}>
        <Route path={ROUTES.DASHBOARD.PROFILE} element={<Dashboard />} />
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
