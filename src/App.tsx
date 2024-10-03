import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";

import AuthedLayout from "./components/layouts/AuthedLayout";
import UnauthedLayout from "./components/layouts/UnauthedLayout";

import Login from "./pages/Login";
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
import LemonResult from "./pages/LemonResult";
import GlobalLeaderboard from "./pages/GlobalLeaderboard";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GamesHistory from "./pages/GamesHistory";
import GameDetails from "./pages/GameDetails";
import InitialiseSignUp from "./pages/InitialiseSignUp";
import CompleteSignUp from "./pages/CompleteSignUp";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

import { RootState } from "./store";
import { AuthState, GameState } from "./types";
import * as ROUTES from "./routes";

export default function App() {
  const location = useLocation();

  const { gamePin, avatar: avatarImage } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const [socket, setSocket] = useState<Socket | null>(null);

  const disconnects = useRef(0);

  useEffect(() => {
    if (!socket || !socket.connected) {
      const newSocket = io(`${process.env.REACT_APP_BASE_URL}/game`);
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("connected!");
        if (disconnects.current) {
          newSocket.emit("reconnected", {
            game_pin: gamePin,
            player_name: username,
            avatar: avatarImage,
            user_id: id,
          });
        }
      });

      newSocket.on("reconnect", () => {
        console.log("reconnected!");
        newSocket.emit("reconnected", {
          game_pin: gamePin,
          player_name: username,
          avatar: avatarImage,
          user_id: id,
        });
      });

      newSocket.on("disconnect", () => {
        console.log("disconnected!");
        disconnects.current = disconnects.current + 1;
      });
    } else if (socket.disconnected) {
      socket.connect();
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("reconnect");
        socket.off("disconnect");
      }
    };
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
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
      <Route
        path={ROUTES.PLAY.SELECT_CATEGORY}
        element={<SelectCategory socket={socket} />}
      />
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

      <Route path={ROUTES.AUTH.SIGNIN} element={<Login />} />
      <Route element={<UnauthedLayout />}>
        <Route path={ROUTES.AUTH.BEGIN_SIGNUP} element={<InitialiseSignUp />} />
        <Route
          path={ROUTES.AUTH.COMPLETE_SIGNUP}
          element={<CompleteSignUp />}
        />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>

      <Route element={<AuthedLayout />}>
        <Route path={ROUTES.DASHBOARD.PROFILE} element={<Dashboard />} />
        <Route path={ROUTES.DASHBOARD.GAMES} element={<GamesHistory />} />
        <Route path={ROUTES.DASHBOARD.GAME_DETAILS} element={<GameDetails />} />
        <Route
          path={ROUTES.DASHBOARD.LEADERBOARD}
          element={<GlobalLeaderboard />}
        />

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
