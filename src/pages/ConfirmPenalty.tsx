import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import info from "../assets/images/info-icon.svg";
import lemons from "../assets/images/lemon-coloured.svg";
import copy from "../assets/images/copy.svg";
import shuffle from "../assets/images/shuffle.svg";

import { playerColours } from "../helpers/misc";
import { avatarMap } from "../helpers/misc";
import { joinGame, setPlayers } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const ConfirmPenalty = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const {
    gameTitle,
    gamePin,
    categories,
    category,
    levels,
    level,
    difficulty,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [seconds, setSeconds] = useState(10);

  const renderTime = () => (
    <div className="flex flex-col justify-center items-center">
      <span className="font-lal text-[2rem] text-white text-center leading-[3.125rem] tracking-[-0.15px] relative top-[0.25rem]">
        {seconds}
      </span>
      <span className="font-lex text-[0.5rem] text-white text-center leading-[0.625rem] tracking-[-0.15px] relative bottom-[0.75rem]">
        seconds
      </span>
    </div>
  );

  useEffect(() => {
    let intervalId: any;
    if (seconds) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-9 pt-[8rem] pb-[4.25rem]">
      {/* {loading ? <Loader /> : null} */}
      <div className="flex flex-col items-center">
        <h1 className="text-[1.901rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase mb-[0.875rem]">
          PENALTY TRIGGER!
        </h1>
        <div className="flex justify-center items-center mb-[0.625rem]">
          <CountdownCircleTimer
            isPlaying={seconds > 0}
            duration={60}
            colors="#F34348"
            trailColor="#4F4F4F"
            size={63}
            strokeWidth={4}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <h3 className="text-[1.301rem] text-center leading-[1.518rem] tracking-[-0.16px] max-w-[14.688rem] mb-7">
          LEMON 15 <br />
          picked the wrong answer!
        </h3>
        <h4 className="text-[1.5rem] text-center text-crimson leading-[1.75rem] tracking-[-0.18px]">
          PENALTY:
        </h4>
        <h4 className="text-[1.5rem] text-center leading-[1.75rem] tracking-[-0.18px] mb-[0.625rem]">
          Take two shots of tequila
        </h4>
        <div className="border border-white rounded-[30px] py-1 px-[0.625rem] flex items-center mb-[0.625rem]">
          <img src={shuffle} alt="share" className="mr-2" />
          <span className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px]">
            Randomize
          </span>
        </div>
        <div className="flex h-[2rem] items-center justify-center mb-[0.625rem]">
          <hr className="border border-white w-[2rem]" />
          <span className="font-medium font-inter text-[0.875rem] text-white leading-[1.094rem] px-2">
            OR
          </span>
          <hr className="border border-white w-[2rem]" />
        </div>
        <h3 className="text-[1.5rem] text-center leading-[1.75rem] tracking-[-0.18px] mb-7">
          Pay a N1000 fine
        </h3>
        <div className="flex">
          <img
            src={info}
            alt="info"
            className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
          />
          <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
            Confirm that the player completes the penalty or pay the escape fine
            to resume the game
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-[0.625rem]">
        <Button text="Confirm Penalty" />
        <Button text="Skip Penalty" className="border border-white !bg-black text-white" />
      </div>
    </AppLayout>
  );
};

export default ConfirmPenalty;
