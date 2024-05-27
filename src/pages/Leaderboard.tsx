import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import avatar from "../assets/images/avatar.svg";

import { RootState, AppDispatch } from "../store";
import { endGame, fetchGameResult } from "../store/features/game";
import { GameState } from "../types";
import * as ROUTES from "../routes";
import Loader from "../components/misc/Loader";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, results } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  useEffect(() => {
    dispatch(fetchGameResult(gameSession as string));
  }, [dispatch, gameSession]);

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-6">
      <div className="grow pb-[2.5rem] px-[1.875rem] flex flex-col justify-center items-center">
        {loading ? <Loader /> : null}
        <h1 className="text-center text-orange text-[2.25rem] md:text-[5.625rem] font-black">
          MOVIE STARS
        </h1>
        <h3 className="text-center text-[1rem] md:text-[1.75rem] font-bold tracking-[0.25rem] mb-[3.25rem] md:mb-5">
          LEADERBOARD
        </h3>
        <div className="mb-[1.75rem] md:mb-[3rem] flex flex-col gap-y-[0.625rem] md:gap-y-4 md:max-w-[42.375rem]">
          {results.map((result, i) => (
            <div
              className="border border-violet md:border-[#AFAFAF] rounded-[6px] md:rounded-[25px] flex items-center p-3 md:py-4 md:px-[5rem] md:bg-[#FFFFFF30]"
              key={i}
            >
              <img
                src={avatar}
                alt="profile"
                className="h-[1.313rem] w-[1.313rem] rounded-full mr-[0.625rem] border border-white md:hidden"
              />
              <span className="text-[1.063rem] md:[1.875rem] md:font-black">{result.player_name}</span>
              <span className="text-[1.125rem] md:[1.875rem] font-bold md:font-black ml-auto">
                {result.point}
              </span>
            </div>
          ))}
        </div>
        <Button
          text="NEXT GAME"
          className="border border-violet md:border-white !bg-inherit !p-4 !font-extrabold md:shadow-inner md:max-w-[21.25rem] md:rounded-none md:text-[2.25rem]"
          onClick={() => {
            dispatch(endGame());
            navigate(ROUTES.PLAY.PICK_GAME);
          }}
        />
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
