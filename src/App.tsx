import { Routes, Route, Navigate } from "react-router-dom";

import UnauthedLayout from "./components/layouts/UnauthedLayout";
import AuthedLayout from "./components/layouts/AuthedLayout";

import GetStarted from "./pages/GetStarted";
// import Play from "./pages/Play";
import PlayNow from "./pages/PlayNow";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Hurray from "./pages/Hurray";
import Dashboard from "./pages/Dashboard";
import SelectGame from "./pages/SelectGame";
import ScrambledWords from "./pages/ScrambledWords";
import ScrambledWordsGame from "./pages/ScrambledWordsGame";
import CreateScrambledWordsGame from "./pages/CreateScrambledWordsGame";
import CreateScrambledWordsNewGame from "./pages/CreateScrambledWordsNewGame";
import Leaderboard from "./pages/Leaderboard";
import StartGame from "./pages/StartGame";
import JoinGame from "./pages/JoinGame";
import Landing from "./pages/Landing";

import * as ROUTES from "./routes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path={ROUTES.PLAY.GET_STARTED} element={<GetStarted />} />
      <Route path={ROUTES.PLAY.PLAY_GAME} element={<Landing />} />
      <Route path={ROUTES.PLAY.HURRAY} element={<Hurray />} />
      <Route path={ROUTES.PLAY.PICK_GAME} element={<SelectGame />} />
      <Route path={ROUTES.PLAY.LEADERBOARD} element={<Leaderboard />} />
      <Route path={ROUTES.PLAY.JOIN_GAME} element={<JoinGame />} />
      <Route
        path={ROUTES.SCRAMBLED_WORDS.GAME}
        element={<ScrambledWordsGame />}
      />
      <Route path="/current" element={<StartGame />} />

      <Route element={<UnauthedLayout />}>
        <Route path={ROUTES.AUTH.SIGNIN} element={<Login />} />
        <Route path={ROUTES.AUTH.SIGNUP} element={<SignUp />} />
      </Route>

      <Route element={<AuthedLayout />}>
        <Route path={ROUTES.DASHBOARD.PROFILE} element={<Dashboard />} />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.CATEGORY}
          element={<ScrambledWords />}
        />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.CREATE_GAME}
          element={<CreateScrambledWordsGame />}
        />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.NEW_GAME}
          element={<CreateScrambledWordsNewGame />}
        />
        <Route path={ROUTES.PLAY.PLAY_NOW} element={<PlayNow />} />
        <Route path={ROUTES.PLAY.START_GAME} element={<StartGame />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
