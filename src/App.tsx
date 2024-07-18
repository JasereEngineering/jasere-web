import { Routes, Route, Navigate } from "react-router-dom";

import UnauthedLayout from "./components/layouts/UnauthedLayout";
import AuthedLayout from "./components/layouts/AuthedLayout";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SelectGame from "./pages/SelectGame";
import ScrambledWordsCategory from "./pages/ScrambledWordsCategory";
import ScrambledWordsGame from "./pages/ScrambledWordsGame";
import CreateScrambledWordsGame from "./pages/CreateScrambledWordsGame";
import CreateScrambledWordsNewGame from "./pages/CreateScrambledWordsNewGame";
import Leaderboard from "./pages/Leaderboard";
import StartGame from "./pages/StartGame";
import JoinGame from "./pages/JoinGame";
import Landing from "./pages/Landing";
import Play from "./pages/Play";
import ScrambledWordsDifficulty from "./pages/ScrambledWordsDifficulty";

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
      <Route
        path={ROUTES.SCRAMBLED_WORDS.GAME}
        element={<ScrambledWordsGame />}
      />
      {/* <Route path="/current" element={<Dashboard />} /> */}

      <Route element={<UnauthedLayout />}>
        <Route path={ROUTES.AUTH.SIGNIN} element={<Login />} />
        <Route path={ROUTES.AUTH.SIGNUP} element={<SignUp />} />
      </Route>

      <Route element={<AuthedLayout />}>
        <Route path={ROUTES.DASHBOARD.PROFILE} element={<Dashboard />} />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.CATEGORY}
          element={<ScrambledWordsCategory />}
        />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.DIFFICULTY}
          element={<ScrambledWordsDifficulty />}
        />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.CREATE_GAME}
          element={<CreateScrambledWordsGame />}
        />
        <Route
          path={ROUTES.SCRAMBLED_WORDS.NEW_GAME}
          element={<CreateScrambledWordsNewGame />}
        />
        <Route path={ROUTES.PLAY.PICK_GAME} element={<SelectGame />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={ROUTES.PLAY.GET_STARTED} replace />}
      />
    </Routes>
  );
}
