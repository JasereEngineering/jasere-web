import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import AltPlayerCard from "../components/misc/AltPlayerCard";

import avatar from "../assets/images/party.jpg";

import { RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const StartGame = () => {
  const navigate = useNavigate();

  const { gameSession, gameTitle, gamePin } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [num, setNum] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNum((prevNumber) => {
        return prevNumber === 3 ? 0 : prevNumber + 1;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <AppLayout
      className="font-lato flex flex-col"
      navClassName="mb-6 md:mb-[4.875rem]"
    >
      <div className="grow md:hidden px-6 pb-6">
        <h1 className="text-center text-[0.813] font-semibold mb-8">
          TO JOIN GAME, SCAN QR CODE
        </h1>
        <div className="flex justify-between mb-[4.688rem]">
          <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[6px] aspect-square max-w-[6.25rem]">
            <div className="rounded-[4px] bg-[#2C2F48] p-1.5">
              <QRCode
                style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                value={`${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
                fgColor="#2C2F48"
              />
            </div>
          </div>
          <div className="relative bg-gradient-to-r from-[#1E1E1E] to-[#18365E]">
            <div className="w-[1px] h-full bg-[#F5F5F5]"></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#1E1E1E] to-[#18365E] text-raj text-[0.563rem] font-medium p-1">
              OR
            </span>
          </div>
          <div className="flex flex-col justify-between items-center">
            <p className="font-medium text-[1rem]">Copy Code</p>
            <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[10px] w-full">
              <div className="rounded-[8px] bg-gradient-to-r from-[#2C2F48] to-[#2C2F48] p-[0.625rem] uppercase font-black text-[2.25rem] text-center leading-[1.875rem] tracking-[0.05rem]">
                {gamePin}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[10px] self-center">
            <div className="rounded-[8px] bg-gradient-to-r from-[#2C2F48] to-[#2C2F48] py-[0.625rem] px-[1.625rem] uppercase font-bold text-[0.875rem] text-center leading-[1rem] tracking-[0.1rem]">
              PLAYERS LOBBY
            </div>
          </div>
          <div className="pt-5">
            <p className="text-center text-[0.813rem] font-semibold leading-[1rem] tracking-[0.1rem]">
              Waiting for players
              {Array.from({ length: num }).map((_, i) => (
                <span key={i}>.</span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:grid grid-cols-2 px-[2.5rem]">
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
          <Button
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
          />
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
      </div>
    </AppLayout>
  );
};

export default StartGame;
