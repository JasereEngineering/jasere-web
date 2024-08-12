import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import info from "../assets/images/info-icon.svg";
import lemons from "../assets/images/lemon-coloured.svg";
import copy from "../assets/images/copy.svg";
import check from "../assets/images/check-sign.svg";

import { playerColours } from "../helpers/misc";
import { avatarMap } from "../helpers/misc";
import { joinGame, setPlayers } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const LemonNumber = () => {
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

  const [num, setNum] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const gameCategory = categories.find(
    (c) => c.category_id === category
  )?.category_name;

  const difficultyLevel = levels.find((l) => l.level_value === level)?.level;

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-9 pt-[8rem] pb-[4.25rem]">
      {/* {loading ? <Loader /> : null} */}
      <div className="flex flex-col items-center">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          {gameTitle?.replaceAll("-", " ")}
        </h1>
        <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-9 capitalize">
          9 Players | {difficulty || difficultyLevel}
        </p>
        <h3 className="text-[1.375rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-5">
          You have been assigned as
        </h3>
        <img src={lemons} alt="lemons" />
        <h2 className="text-[2rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-12">
          LEMON 15
        </h2>
        <div className="flex">
          <img
            src={info}
            alt="info"
            className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
          />
          <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
            Lemon numbers are assigned to players at random for a more immersive
            experience
          </p>
        </div>
      </div>
      <Button
        text="Let's Play"
        // disabled={!!notCreator}
        // onClick={() => {
        //   setLoading(true);
        //   socket.current.emit("start", {
        //     game_pin: gamePin,
        //     game_data: {
        //       trivia,
        //     },
        //   });
        // }}
      />
    </AppLayout>
  );
};

export default LemonNumber;
