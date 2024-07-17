import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import avatar from "../assets/images/avatar2.svg";
import copy from "../assets/images/copy.svg";

import { RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const StartGame = () => {
  const socket = useRef<any>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");

  const {
    gameSession,
    gameTitle,
    gamePin,
    categories,
    category,
    levels,
    level,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [copied, setCopied] = useState(false);

  const gameCategory = categories.find(
    (c) => c.category_id === category
  )?.category_name;

  const difficulty = levels.find((l) => l.level_value === level)?.level;

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
        game_pin: "646366",
        player_name: "Michael",
      });

      socket.current.on("join", (response: any) => {
        console.log({ response });
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
      <div className="flex flex-col items-center">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px]">
          SCRAMBLED WORDS
        </h1>
        <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.125rem] capitalize">
          {gameCategory} | {difficulty}
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
        <h3 className="font-lal text-[1rem] text-center leading-[1.625rem] tracking-[-0.34px] mb-4">
          Players in the lobby 4/6:
        </h3>
        <div className="grid grid-cols-3 gap-[0.625rem] mb-10">
          <div className="rounded-[25px] bg-[#FBD2D3] flex items-center min-w-[5.375rem] py-1.5 pl-1.5">
            <img
              src={avatar}
              alt="avatar"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />
            <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
              ola
            </p>
          </div>
          <div className="rounded-[25px] bg-[#FBD2D3] flex items-center min-w-[5.375rem] py-1.5 pl-1.5">
            <img
              src={avatar}
              alt="avatar"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />
            <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
              ola
            </p>
          </div>
          <div className="rounded-[25px] bg-[#FBD2D3] flex items-center min-w-[5.375rem] py-1.5 pl-1.5">
            <img
              src={avatar}
              alt="avatar"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />
            <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
              ola
            </p>
          </div>
          <div className="rounded-[25px] bg-[#FBD2D3] flex items-center min-w-[5.375rem] py-1.5 pl-1.5">
            <img
              src={avatar}
              alt="avatar"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />
            <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
              ola
            </p>
          </div>
          <div className="rounded-[25px] bg-[#FBD2D3] flex items-center min-w-[5.375rem] py-1.5 pl-1.5">
            <img
              src={avatar}
              alt="avatar"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />
            <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
              annie
            </p>
          </div>
          <div className="rounded-[25px] bg-[#FBD2D3] flex items-center w-[5.375rem] py-1.5 pl-1.5">
            <img
              src={avatar}
              alt="avatar"
              className="h-[1.875rem] w-[1.875rem] rounded-full"
            />
            <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize truncate">
              zeldina
            </p>
          </div>
        </div>
      </div>
      <Button text="Let's Play" disabled onClick={() => {}} />
      {/* <div className="hidden md:grid grid-cols-2 px-[2.5rem]">
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] w-[25rem] h-[25rem] mb-[2.25rem]">
            <div className="rounded-[18px] bg-[#2C2F48] p-[2.7rem]">
              <QRCode
                style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                value={`${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
                fgColor="#2C2F48"
              />
            </div>
          </div>
          <h1 className="font-black text-[4rem] text-center leading-[1rem] mb-3">
            SCAN CODE
          </h1>
          <h2 className="font-semibold text-[2rem] text-center">
            TO JOIN GAME
          </h2>

          <div className="flex w-[24rem] min-h-[1.875rem] items-center">
            <hr className="border border-white grow" />
            <span className="font-raj font-medium text-[1.25rem] p-3">OR</span>
            <hr className="border border-white grow" />
          </div>
          <h2 className="font-semibold text-[1.25rem] text-center leading-[1.875rem] mb-3">
            COPY CODE
          </h2>
          <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] mb-8">
            <div className="rounded-[18px] bg-[#1E1E1E] px-[2.75rem] py-[1.563rem] uppercase font-black text-[4rem] text-center leading-[1.875rem] tracking-[0.1rem]">
              {gamePin}
            </div>
          </div>
          {!notCreator ? <Button
            text="START GAME"
            onClick={() =>
              navigate(
                ROUTES.PLAY.BEGIN_GAME_FOR(
                  gameTitle as string,
                  gameSession as string
                )
              )
            }
            className="max-w-[25rem] !p-5 !bg-purple text-[2rem]"
          />: null}
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] mb-[8.313rem]">
            <div className="rounded-[18px] bg-gradient-to-r from-[#2C2F48] to-[#2C2F48] py-[1.625rem] px-[2.875rem] uppercase font-bold text-[2.25rem] text-center leading-[1rem]">
              PLAYERS LOBBY
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-[2.625rem]">
            <AltPlayerCard name={username as string} image={avatar} />
          </div>
        </div>
      </div> */}
    </AppLayout>
  );
};

export default StartGame;
