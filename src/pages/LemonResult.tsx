import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";
import Button from "../components/forms/Button";

import avatar from "../assets/images/avatar2.svg";
import crown from "../assets/images/crown.svg";
import share from "../assets/images/share.svg";

import { avatarMap } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { endGame } from "../store/features/game";
import { playerColours } from "../helpers/misc";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const LemonResult = ({ socket }: { socket: Socket }) => {
  const { connected } = socket;

  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;
  const {
    // loading,
    // results,
    categoryName,
    difficulty,
    gameTitle,
    gamePin,
    avatar: avatarImage,
  } = useSelector<RootState>(({ game }) => game) as GameState;

  const [result, setResult] = useState<any>([]);

  // useEffect(() => {
  //   dispatch(fetchGameResult(gameSession as string));
  // }, [dispatch, gameSession]);

  useEffect(() => {
    if (connected) {
      socket.emit("leaderboard", {
        game_pin: gamePin,
        game_session_id: gameSession,
      });

      socket.on("leaderboard", (response: any) => {
        console.log({ response });
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
        } else {
          setResult(
            response.game_data.results.results.sort(
              (a: any, b: any) => b.point - a.point
            )
          );
        }
      });
    }
    // eslint-disable-next-line
  }, [connected]);

  return (
    <AppLayout className="font-lal flex flex-col absolute pt-[8rem]">
      {!result.length ? <Loader /> : null}
      <div className="flex flex-col items-center px-[1.875rem] pb-[14rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] mb-5">
          ROUND OVER!
        </h1>
        <div className="rounded-[35px] bg-[#7EAED6] h-[6rem] w-[5.688rem] p-2 flex flex-col items-center justify-between mb-[1.125rem]">
          <img
            src={avatar}
            alt="avatar"
            className="w-[2.625rem] h-[2.625rem] rounded-full"
          />
          <p className="text-[1.188rem] text-center leading-[1.875rem] tracking-[-0.47px] truncate">
            Mikeal
          </p>
        </div>
        <h2 className="text-[1.301rem] text-center leading-[1.518rem] tracking-[-0.16px] mb-2.5">
          LEMON 15 <br />
          picked the wrong answer!
        </h2>
        <div className="h-[1px] w-full bg-white bg-opacity-[39%] mb-[1.375rem]"></div>
        {result.map((r: any, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center w-full mb-5"
          >
            <div className="flex items-center">
              <img
                src={
                  r.avatar
                    ? avatarMap[r.avatar as keyof typeof avatarMap]
                    : avatar
                }
                alt="avatar"
                className="mr-1.5 h-[1.875rem] w-[1.875rem]"
              />
              <span className="text-[0.875rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
                {r.player_name}
              </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-x-1">
              <span className="font-lex text-[0.688rem] leading-[0.859rem] tracking-[-0.34px]">
                {r.point}pts
              </span>
              {i === 0 ? <img src={crown} alt="champ" /> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-4 w-full fixed bottom-0 bg-black px-[1.875rem] pb-[3.5rem] pt-[2rem]">
        <Button text="Next Round" />
        <Button
          text="End Game"
          className="border border-[#F34348] !bg-black text-white"
          onClick={() => {
            dispatch(endGame());
            navigate(ROUTES.PLAY.GET_STARTED);
          }}
        />
      </div>
    </AppLayout>
  );
};

export default LemonResult;
