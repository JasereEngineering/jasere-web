import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.png";
import crown from "../assets/images/crown.svg";
import share from "../assets/images/share.svg";
import replay from "../assets/images/replay.svg";
import category from "../assets/images/category.svg";
import pad from "../assets/images/game-pad.svg";

import { avatarMap } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { endGame } from "../store/features/game";
import { playerColours } from "../helpers/misc";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";
import BottomModal from "../components/misc/BottomModal";

const Leaderboard = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const {
    categoryName,
    difficulty,
    gameTitle,
    gamePin,
    avatar: avatarImage,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const [result, setResult] = useState<any>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    socket?.on("reconnect", () => {
      socket?.emit("join", {
        game_pin: gamePin,
        player_name: username,
        avatar: avatarImage,
        user_id: id,
      });
    });

    socket?.emit("leaderboard", {
      game_pin: gamePin,
      game_session_id: gameSession,
    });

    socket?.on("leaderboard", (response: any) => {
      console.log({ response });
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
      } else {
        setResult(
          response.game_data.results.data.sort(
            (a: any, b: any) => b.point - a.point
          )
        );
      }
    });
    // eslint-disable-next-line
  }, [gamePin, gameSession]);

  return (
    <AppLayout className="font-lal flex flex-col absolute pt-[8rem]">
      {!result.length ? <Loader /> : null}
      <div className="flex flex-col items-center px-[2.813rem] pb-[8rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          {gameTitle?.replaceAll("-", " ")}
        </h1>
        <p className="font-inter font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[2.75rem] capitalize">
          {categoryName} | {difficulty}
        </p>
        <div className="p-[1.625rem] bg-green rounded-[1.875rem] font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.25px] relative mb-8 uppercase">
          <img
            loading="lazy"
            src={
              result[0]?.avatar
                ? avatarMap[result[0]?.avatar as keyof typeof avatarMap]
                : avatar
            }
            alt="avatar"
            className="h-[3.375rem] w-[3.375rem] rounded-full absolute top-[-1.5rem] left-0"
          />
          {result[0]?.player_name} WINS THIS ROUND!
        </div>
        <h1 className="font-lal text-[1.5rem] leading-[2.375rem] tracking-[4px] relative mb-[1.125rem]">
          LEADERBOARD
        </h1>
        {result.map((r: any, i: number) => (
          <div
            key={i}
            className={`flex justify-between items-center rounded-[25px] p-1.5 pr-3 w-full mb-[0.625rem] bg-[${
              playerColours[i % playerColours.length]
            }]`}
            style={{
              backgroundColor: playerColours[i % playerColours.length],
            }}
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
              <span className="font-lal text-black text-[0.875rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
                {r.player_name}
              </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-x-1">
              <span className="font-lex text-black text-[0.688rem] leading-[0.859rem] tracking-[-0.34px]">
                {r.point}pts
              </span>
              {i === 0 ? <img loading="lazy" src={crown} alt="champ" /> : null}
            </div>
          </div>
        ))}
        <div className="border border-white rounded-[30px] py-1 px-[0.625rem] mt-[0.625rem] flex items-center">
          <img loading="lazy" src={share} alt="share" className="mr-2" />
          <span className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px]">
            Share
          </span>
        </div>
      </div>
      <button
        className="capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full fixed bottom-0 left-0 right-0"
        onClick={() => {
          dispatch(endGame());
          setModal(true);
          // navigate(ROUTES.PLAY.GET_STARTED);
        }}
      >
        NEXT ROUND
      </button>
      <BottomModal onClose={() => setModal(false)} showModal={modal}>
        <div className="px-[2.625rem] pb-[5rem]">
          <h3 className="text-[1.5rem] text-center text-white leading-[2.351rem] tracking-[1px] mb-6">
            Choose an Option
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div
              className="border border-white rounded-[9px] flex flex-col items-center pt-11 pb-[1.875rem]"
              onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
            >
              <img
                loading="lazy"
                src={replay}
                alt="replay"
                className="mb-7 w-[3.375rem] h-[3.375rem]"
              />
              <p className="text-[1rem] leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                Replay
              </p>
            </div>
            <div
              className="border border-white rounded-[9px] flex flex-col items-center pt-11"
              onClick={() => navigate(ROUTES.SCRAMBLED_WORDS.CATEGORY)}
            >
              <img
                loading="lazy"
                src={category}
                alt="category"
                className="mb-7 w-[3.375rem] h-[3.375rem]"
              />
              <p className="text-[1rem] text-center leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                Choose Game Category
              </p>
            </div>
            <div
              className="border border-white rounded-[9px] flex flex-col items-center justify-center col-span-2 h-[9.375rem]"
              onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
            >
              <img
                loading="lazy"
                src={pad}
                alt="pad"
                className="mb-4 w-[3.375rem] h-[3.375rem]"
              />
              <p className="text-[1rem] text-center leading-[1.567rem] tracking-[-0.1px]">
                Create a New Game Session
              </p>
            </div>
          </div>
        </div>
      </BottomModal>
    </AppLayout>
  );
};

export default Leaderboard;
