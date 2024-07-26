import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.svg";
import crown from "../assets/images/crown.svg";
import share from "../assets/images/share.svg";

import { RootState, AppDispatch } from "../store";
import { endGame, fetchGameResult } from "../store/features/game";
import { playerColours } from "../helpers/misc";
import { GameState } from "../types";
import * as ROUTES from "../routes";

const Leaderboard = () => {
  const socket = useRef<any>(null);

  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, results, categoryName, difficulty, gameTitle, gamePin } =
    useSelector<RootState>(({ game }) => game) as GameState;

  const [result, setResult] = useState([]);

  useEffect(() => {
    dispatch(fetchGameResult(gameSession as string));
  }, [dispatch, gameSession]);

  useEffect(() => {
    if (!socket?.current || !socket?.current?.connected) {
      socket.current = io(`${process.env.REACT_APP_BASE_URL}/game`);

      socket.current.on("connect", () => {
        console.log("connected!");
      });

      socket.current.emit("leaderboard", {
        game_pin: gamePin,
        game_session_id: gameSession,
      });

      socket.current.on("leaderboard", (response: any) => {
        console.log({ response });
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
        } else {
          setResult([]);
        }
      });

      socket.current.on("disconnect", () => {
        console.log("disconnected!");
      });
    }

    return () => {
      if (socket?.current) {
        socket?.current.disconnect();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout className="font-lal flex flex-col absolute pt-[8rem]">
      {loading ? <Loader /> : null}
      <div className="flex flex-col items-center px-[2.813rem] pb-[8rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          {gameTitle?.replaceAll("-", " ")}
        </h1>
        <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[2.75rem] capitalize">
          {categoryName} | {difficulty}
        </p>
        <div className="p-[1.625rem] bg-green rounded-[1.875rem] font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.25px] relative mb-8 uppercase">
          <img
            src={avatar}
            alt="avatar"
            className="h-[3.375rem] w-[3.375rem] absolute top-[-1.5rem] left-0"
          />
          {results[0]?.player_name} WINS THIS ROUND!
        </div>
        <h1 className="font-lal text-[1.5rem] leading-[2.375rem] tracking-[4px] relative mb-[1.125rem]">
          LEADERBOARD
        </h1>
        {results.map((result, i) => (
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
              <img src={avatar} alt="avatar" className="mr-1.5" />
              <span className="font-lal text-black text-[0.875rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
                {result.player_name}
              </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-x-1">
              <span className="font-lex text-black text-[0.688rem] leading-[0.859rem] tracking-[-0.34px]">
                {result.point}pts
              </span>
              {i === 0 ? <img src={crown} alt="champ" /> : null}
            </div>
          </div>
        ))}
        <div className="border border-white rounded-[30px] py-1 px-[0.625rem] mt-[0.625rem] flex items-center">
          <img src={share} alt="share" className="mr-2" />
          <span className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px]">
            Share
          </span>
        </div>
      </div>
      <button
        className="capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full fixed bottom-0"
        onClick={() => {
          dispatch(endGame());
          navigate(ROUTES.PLAY.GET_STARTED);
        }}
      >
        Next Round
      </button>
    </AppLayout>
  );
};

export default Leaderboard;
