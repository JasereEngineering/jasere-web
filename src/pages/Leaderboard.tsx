import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import avatar from "../assets/images/avatar2.svg";
import crown from "../assets/images/crown.svg";
import share from "../assets/images/share.svg";

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
    <AppLayout className="font-lal flex flex-col justify-between pt-[8rem]">
      <div className="flex flex-col items-center px-[2.813rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px]">
          SCRAMBLED WORDS
        </h1>
        <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[2.75rem]">
          Celebrities | Noobie
        </p>
        <div className="p-[1.625rem] bg-green rounded-[1.875rem] font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.25px] relative mb-8">
          <img
            src={avatar}
            alt="avatar"
            className="h-[3.375rem] w-[3.375rem] absolute top-[-1.5rem] left-0"
          />
          DAVE WINS THIS ROUND!
        </div>
        <h1 className="font-lal text-[1.5rem] leading-[2.375rem] tracking-[4px] relative mb-[1.125rem]">
          LEADERBOARD
        </h1>
        <div className="flex justify-between items-center bg-[#FBD2D3] rounded-[25px] p-1.5 pr-3 w-full mb-[0.625rem]">
          <div className="flex items-center">
            <img src={avatar} alt="avatar" className="mr-1.5" />
            <span className="font-lal text-black text-[0.875rem] leading-[1.313rem] tracking-[-0.34px]">
              Annie
            </span>
          </div>
          <div className="flex flex-row-reverse items-center gap-x-1">
            <span className="font-lex text-black text-[0.688rem] leading-[0.859rem] tracking-[-0.34px]">
              75pts
            </span>
            <img src={crown} alt="champ" />
          </div>
        </div>
        <div className="border border-white rounded-[30px] py-1 px-[0.625rem] mt-[0.625rem] flex items-center">
          <img src={share} alt="share" className="mr-2" />
          <span className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px]">
            Share
          </span>
        </div>
      </div>
      <button className="capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full">
        Next Round
      </button>
      {/* <div className="grow pb-[2.5rem] px-[1.875rem] flex flex-col justify-center items-center">
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
      </div> */}
    </AppLayout>
  );
};

export default Leaderboard;
