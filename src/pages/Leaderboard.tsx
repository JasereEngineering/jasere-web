import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Navbar from "../components/navigation/Navbar";
import Button from "../components/forms/Button";

import avatar from "../assets/images/avatar.svg";

import { RootState, AppDispatch } from "../store";
import { fetchGameResult } from "../store/features/game";
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
    <AppLayout className="font-lato flex flex-col">
      <Navbar className="mb-6" />
      <div className="grow pb-[2.5rem] px-[1.875rem] flex flex-col justify-center">
        {loading ? <Loader /> : null}
        <h1 className="text-center text-orange text-[2.25rem] font-black">
          MOVIE STARS
        </h1>
        <h3 className="text-center text-[1rem] font-bold tracking-[0.25rem] mb-[3.25rem]">
          LEADERBOARD
        </h3>
        <div className="mb-[1.75rem] flex flex-col gap-y-[0.625rem]">
          {results.map((result, i) => (
            <div
              className="border border-violet rounded-[6px] flex items-center p-3"
              key={i}
            >
              <img
                src={avatar}
                alt="profile"
                className="h-[1.313rem] w-[1.313rem] rounded-full mr-[0.625rem] border border-white"
              />
              <span className="text-[1.063rem]">{result.player_name}</span>
              <span className="text-[1.125rem] font-bold ml-auto">
                {result.point}
              </span>
            </div>
          ))}
        </div>
        <Button
          text="NEXT GAME"
          className="border border-violet !bg-inherit !p-4 !font-extrabold"
          onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
        />
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
