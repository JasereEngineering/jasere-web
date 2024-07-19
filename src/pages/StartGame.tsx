import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.svg";
import copy from "../assets/images/copy.svg";
import check from "../assets/images/check-sign.svg";

import { playerColours } from "../helpers/misc";
import { joinGame, setPlayers } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const StartGame = () => {
  const socket = useRef<any>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const notCreator = searchParams.get("player");

  const {
    gameSession,
    gameTitle,
    gamePin,
    categories,
    category,
    levels,
    level,
    players,
    trivia,
    difficulty,
    categoryName,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const gameCategory = categories.find(
    (c) => c.category_id === category
  )?.category_name;

  const difficultyLevel = levels.find((l) => l.level_value === level)?.level;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    if (!socket?.current) {
      socket.current = io(`${process.env.REACT_APP_BASE_URL}/game`);

      socket.current.on("connect", () => {
        console.log("connected!");
      });

      socket.current.emit("join", {
        game_pin: gamePin,
        player_name: username,
      });

      socket.current.on("join", (response: any) => {
        console.log({ response });
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
          navigate(-1);
        } else {
          dispatch(setPlayers(response.players));
          dispatch(joinGame(response.game_data));
        }
        setLoading(false);
      });

      socket.current.on("start", (response: any) => {
        console.log({ response });
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
        } else {
          dispatch(joinGame(response.game_data));
          navigate(
            ROUTES.PLAY.BEGIN_GAME_FOR(
              response.game_data.game_name.replaceAll(" ", "-"),
              response.game_data.game_session_id
            )
          );
        }
      });

      socket.current.on("disconnect", () => {
        console.log("disconnected!");
      });
    }

    return () => {
      if (socket?.current) {
        socket?.current.disconnect();
      }
    };
  }, []);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-8 pt-[8rem] pb-[4.25rem]">
      {loading ? <Loader /> : null}
      <div className="flex flex-col items-center">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          {gameTitle?.replaceAll("-", " ")}
        </h1>
        <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.125rem] capitalize">
          {gameCategory || categoryName} | {difficulty || difficultyLevel}
        </p>
        <div className="bg-pink rounded-[10px] p-[0.625rem] font-lal text-[1.375rem] leading-[1.25rem] tracking-[-0.18px] flex flex-col mb-3">
          <span className="text-center">GAME CODE</span>
          <span className="text-center">{gamePin}</span>
        </div>
        <div className="rounded-[10px] p-2 border border-white w-[7.125rem] h-[7.125rem] mb-4">
          <QRCode
            style={{ height: "100%", maxWidth: "100%", width: "100%" }}
            value={`${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
          />
        </div>
        {/* <p className="font-lex text-[1.125rem] text-center leading-[1.406rem] tracking-[-0.4px] mb-6 max-w-[19.313rem]">
        Your game lobby is full!, proceed to start the game
      </p> */}
        <p className="font-lex font-semibold text-[0.875rem] text-center leading-[1.094rem] tracking-[-0.4px] mb-6">
          Waiting for other players to join
        </p>
        {notCreator ? (
          <div className="flex justify-center items-center mb-6">
            <div className="max-w-fit bg-[#24E95B] rounded-[10px] px-4 py-3 flex items-center">
              <img src={check} alt="checkmark" className="mr-2" />
              <span className="font-lex text-black text-[0.938rem] leading-[1.172rem] tracking-[-0.18px]">
                Joined as{" "}
                <span className="font-semibold capitalize">{username}</span>
              </span>
            </div>
          </div>
        ) : (
          <>
            <p className="font-lex text-[0.875rem] text-center leading-[1.094rem] tracking-[-0.4px] mb-2">
              Share link below to invite friends to your game
            </p>
            <div
              className={`flex w-full mb-6 ${
                copied ? "opacity-50" : "opacity-100"
              } transition-opacity duration-300`}
              onClick={handleCopy}
            >
              <div className="bg-[#313131] w-[3rem] flex justify-center items-center rounded-l-[5px]">
                <img src={copy} alt="copy" />
              </div>
              <div className="grow bg-[#4A4A4A] p-2 flex items-center font-light rounded-r-[5px] truncate">
                {`${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
              </div>
            </div>
          </>
        )}
        <h3 className="font-lal text-[1rem] text-center leading-[1.625rem] mb-4">
          Players in the lobby: {players.length}
        </h3>
        <div className="grid grid-cols-3 gap-[0.625rem] mb-10">
          {players.map((p, i) => (
            <div
              className={`rounded-[25px] flex items-center min-w-[5.375rem] p-1.5 bg-[${
                playerColours[i % playerColours.length]
              }]`}
              key={i}
              style={{
                backgroundColor: playerColours[i % playerColours.length],
              }}
            >
              <img
                src={avatar}
                alt="avatar"
                className="h-[1.875rem] w-[1.875rem] rounded-full"
              />
              <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize truncate">
                {p.player_name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Button
        text={notCreator ? "Waiting For Host..." : "Let's Play"}
        disabled={!!notCreator}
        onClick={() => {
          setLoading(true);
          socket.current.emit("start", {
            game_pin: gamePin,
            game_data: {
              trivia,
            },
          });
        }}
      />
    </AppLayout>
  );
};

export default StartGame;
