import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.svg";
import copy from "../assets/images/copy.svg";
import check from "../assets/images/check-sign.svg";
import info from "../assets/images/info-icon.svg";
import lemons from "../assets/images/lemon-coloured.svg";

import { playerColours, colorMap, titleMap } from "../helpers/misc";
import { avatarMap } from "../helpers/misc";
import { joinGame, setPlayers } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const StartGame = ({ socket }: { socket: Socket }) => {
  const { connected } = socket;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const notCreator = searchParams.get("player");

  const {
    gameTitle,
    gamePin,
    gameSession,
    categories,
    category,
    levels,
    level,
    players,
    trivia,
    difficulty,
    categoryName,
    avatar: avatarImage,
    lemonNumber,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [copied, setCopied] = useState(false);
  const [broadcast, setBroadcast] = useState(false);
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
    setTimeout(() => setCopied(false), 300);
  };

  useEffect(() => {
    if (connected) {
      socket.emit("join", {
        game_pin: gamePin,
        player_name: username,
        avatar: avatarImage,
      });

      socket.on("join", (response: any) => {
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

      socket.on("broadcast_lemons", (response: any) => {
        console.log({ response });
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
          setBroadcast(false);
        } else {
          let lemon = response.game_data.players.find(
            (p: any) => p.player_name === username
          )?.lemon_number;
          dispatch(joinGame({ lemon }));
          setBroadcast(true);
        }
        setLoading(false);
      });

      socket.on("start", (response: any) => {
        console.log({ response });
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
        } else {
          dispatch(joinGame(response.game_data));
          // dispatch(setPlayers([]));
          navigate(
            ROUTES.PLAY.BEGIN_GAME_FOR(
              response.game_data.game_name.toLowerCase().replaceAll(" ", "-"),
              response.game_data.game_session_id
            )
          );
        }
      });
    }
    // eslint-disable-next-line
  }, [connected]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-8 pt-[8rem] pb-[4.25rem]">
      {loading ? <Loader /> : null}
      {!broadcast ? (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
              {
                titleMap[
                  gameTitle
                    ?.toLowerCase()
                    .replaceAll(" ", "-") as keyof typeof titleMap
                ]
              }
            </h1>
            <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.125rem] capitalize">
              {!gameTitle?.toLowerCase().includes("lemon")
                ? gameCategory || categoryName
                : `${players.length} Player${
                    players.length > 1 ? "s" : ""
                  }`}{" "}
              | {difficulty || difficultyLevel}
            </p>
            <div
              className={`bg-[${
                colorMap[
                  gameTitle
                    ?.toLowerCase()
                    .replaceAll(" ", "-") as keyof typeof colorMap
                ]
              }] rounded-[10px] p-[0.625rem] font-lal text-[1.375rem] leading-[1.25rem] tracking-[-0.18px] flex flex-col mb-3`}
              style={{
                backgroundColor:
                  colorMap[
                    gameTitle
                      ?.toLowerCase()
                      .replaceAll(" ", "-") as keyof typeof colorMap
                  ],
              }}
            >
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
                    src={
                      p.avatar
                        ? avatarMap[p.avatar as keyof typeof avatarMap]
                        : avatar
                    }
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
              if (gameTitle?.toLowerCase().includes("lemon")) {
                socket.emit("broadcast-lemons", {
                  game_pin: gamePin,
                  game_session_id: gameSession,
                });
              } else {
                socket.emit("start", {
                  game_pin: gamePin,
                  game_data: {
                    trivia,
                  },
                });
              }
            }}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
              {
                titleMap[
                  gameTitle
                    ?.toLowerCase()
                    .replaceAll(" ", "-") as keyof typeof titleMap
                ]
              }
            </h1>
            <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-9 capitalize">
              {!gameTitle?.toLowerCase().includes("lemon")
                ? gameCategory || categoryName
                : `${players.length} Player${
                    players.length > 1 ? "s" : ""
                  }`}{" "}
              | {difficulty || difficultyLevel}
            </p>
            <h3 className="text-[1.375rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-5">
              You have been assigned as
            </h3>
            <img src={lemons} alt="lemons" />
            <h2 className="text-[2rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-12">
              LEMON {lemonNumber}
            </h2>
            <div className="flex">
              <img
                src={info}
                alt="info"
                className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
              />
              <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                Lemon numbers are assigned to players at random for a more
                immersive experience
              </p>
            </div>
          </div>
          <Button
            text={notCreator ? "Waiting For Host..." : "Let's Play"}
            disabled={!!notCreator}
            onClick={() => {
              setLoading(true);
              socket.emit("start", {
                game_pin: gamePin,
                avatar: avatarImage,
              });
            }}
          />
        </>
      )}
    </AppLayout>
  );
};

export default StartGame;
