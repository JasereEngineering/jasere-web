import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";
import Button from "../components/forms/Button";

import avatar from "../assets/images/avatar2.png";
import crown from "../assets/images/crown.svg";

import { avatarMap } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { endGame, joinGame } from "../store/features/game";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const LemonResult = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");

  const dispatch = useDispatch<AppDispatch>();
  const {
    lemonResult,
    lemonNumberPrev,
    players,
    gamePin,
    avatar: avatarImage,
    time,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;

  useEffect(() => {
    socket?.on("reconnect", () => {
      socket?.emit("join", {
        game_pin: gamePin,
        player_name: username,
        avatar: avatarImage,
        user_id: id,
      });
    });

    socket?.on("start", (response: any) => {
      //console.log({ response });
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
      } else {
        dispatch(joinGame(response.game_data));
        navigate(
          ROUTES.PLAY.BEGIN_GAME_FOR(
            response.game_data.game_name.toLowerCase().replaceAll(" ", "-"),
            response.game_data.game_session_id,
            !!notCreator,
          ),
        );
      }
    });

    socket?.on("exit", () => {
      navigate(ROUTES.PLAY.GET_STARTED);
    });
    // eslint-disable-next-line
  }, [socket?.connected]);

  return (
    <AppLayout className="font-lal flex flex-col absolute pt-[8rem]">
      {!lemonResult.length ? <Loader /> : null}
      <div className="flex flex-col items-center px-[1.875rem] pb-[14rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] mb-5">
          ROUND OVER!
        </h1>
        <div className="rounded-[35px] bg-[#7EAED6] h-[6rem] w-[5.688rem] p-2 flex flex-col items-center justify-between mb-[1.125rem] truncate">
          <img
            loading="lazy"
            src={
              avatarMap[
                players.find((p: any) => p.lemon_number === lemonNumberPrev)
                  ?.avatar as keyof typeof avatarMap
              ] || avatar
            }
            alt="avatar"
            className="w-[2.625rem] h-[2.625rem] rounded-full"
          />
          <p className="text-[1.188rem] text-center leading-[1.875rem] tracking-[-0.47px] truncate">
            {
              players.find((p: any) => p.lemon_number === lemonNumberPrev)
                ?.player_name
            }
          </p>
        </div>
        <h2 className="text-[1.301rem] text-center leading-[1.518rem] tracking-[-0.16px] mb-2.5">
          LEMON {lemonNumberPrev} <br />
          picked the wrong answer!
        </h2>
        <div className="h-[1px] w-full bg-white bg-opacity-[39%] mb-[1.375rem]"></div>
        {lemonResult.map((r: any, i: number) => (
          <div
            key={i}
            className="flex justify-between items-center w-full mb-5"
          >
            <div className="flex items-center">
              <img
                loading="lazy"
                src={
                  r.avatar
                    ? avatarMap[r.avatar as keyof typeof avatarMap]
                    : avatar
                }
                alt="avatar"
                className="mr-1.5 h-[1.875rem] w-[1.875rem] rounded-full"
              />
              <span className="text-[0.875rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
                {r.player_name}
              </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-x-1">
              <span className="font-lex text-[0.688rem] leading-[0.859rem] tracking-[-0.34px]">
                {r.point}pts
              </span>
              {i === 0 ? <img loading="lazy" src={crown} alt="champ" /> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-4 w-full fixed bottom-0 left-0 right-0 bg-black px-[1.875rem] pb-[3.5rem] pt-[2rem]">
        <Button
          text={!notCreator ? "Continue" : "Waiting For Host..."}
          className="bg-white text-black"
          disabled={!!notCreator}
          onClick={() => {
            socket?.emit("start", {
              game_pin: gamePin,
              avatar: avatarImage,
              proceed: true,
              game_data: {
                time,
              },
            });
          }}
        />
        {!notCreator ? (
          <Button
            text="End Game"
            className="border border-[#F34348] !bg-black text-white"
            onClick={() => {
              dispatch(endGame());
              socket?.emit("exit", {
                game_pin: gamePin,
              });
            }}
          />
        ) : null}
      </div>
    </AppLayout>
  );
};

export default LemonResult;
