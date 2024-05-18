import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

import AppLayout from "../components/layouts/AppLayout";
import Navbar from "../components/navigation/Navbar";
import Button from "../components/forms/Button";

import { RootState } from "../store";
import { GameState } from "../types";
import * as ROUTES from "../routes";

const StartGame = () => {
  const navigate = useNavigate();

  const { gameSession, gameTitle, gamePin } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  return (
    <AppLayout className="font-lato flex flex-col">
      <Navbar className="mb-5" />
      <div className="flex flex-col items-center grow p-11">
        <h1 className="font-semibold text-[1.75rem] text-center max-w-[10.875rem] mb-3">
          TO JOIN GAME SCAN CODE
        </h1>
        <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] w-[12.813rem] h-[12.813rem] mb-3">
          <div className="rounded-[18px] bg-[#2C2F48] p-3">
            <QRCode
              style={{ height: "100%", maxWidth: "100%", width: "100%" }}
              value={`${
                process.env.REACT_APP_URL
              }${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
              fgColor="#2C2F48"
            />
          </div>
        </div>
        <div className="flex h-[2.188rem] w-[12rem] items-center">
          <hr className="border border-white grow" />
          <span className="font-raj font-medium text-[0.938rem] px-2">OR</span>
          <hr className="border border-white grow" />
        </div>
        <h2 className="font-medium text-[1.438rem] text-center leading-[1.875rem] mb-4">
          COPY CODE
        </h2>
        <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] w-full mb-8">
          <div className="rounded-[18px] bg-gradient-to-r from-[#1E1E1E] to-[#18365E] p-3 uppercase font-black text-[3rem] text-center leading-[1.875rem]">
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
        />
      </div>
    </AppLayout>
  );
};

export default StartGame;
