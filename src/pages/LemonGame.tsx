import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";

import AppLayout from "../components/layouts/AppLayout";
import Lemon from "../components/misc/Lemon";

import lemonBg from "../assets/images/lemon.jpg";
import lemonOneSound from "../assets/sounds/lemon-one.mp3";

import { joinGame } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";

const LemonGame = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const {
    //gameTitle,
    gamePin,
    // avatar: avatarImage,
    //levels,
    //level,
    //difficulty,
    //players,
    lemonNumber,
    lemonNumberPrev,
    lemonNumberNext,
    lemonsDisplayed,
    time,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;

  const [seconds, setSeconds] = useState<number | undefined>(undefined);
  const [selectedLemon, setSelectedLemon] = useState<number | undefined>(
    undefined,
  );

  //const difficultyLevel = levels.find((l) => l.level_value === level)?.level;

  const [sound, setSound] = useState<HTMLAudioElement | null>(null);

  const initializeSound = (file: string) => {
    // const newSound = new Howl({
    //   src: [file],
    //   preload: true, // Preload asynchronously
    //   volume: 1.0,
    //   loop: false,
    //   xhr: {},
    //   onload: () => {
    //     console.log("Sound loaded successfully!");
    //   },
    //   onloaderror: (id, error) => {
    //     console.error("Failed to load sound:", error);
    //   },
    // });
    const newSound = new Audio(file);
    newSound.preload = "auto";
    setSound(newSound);
    newSound.play();
  };

  const handlePlay = () => {
    // const resumeAudioContext = () => {
    //   if (Howler.ctx && Howler.ctx.state === "suspended") {
    //     Howler.ctx.resume().then(() => {
    //       console.log("AudioContext resumed");
    //     });
    //   }
    // };
    // resumeAudioContext();
    if (sound) {
      sound?.play();
    } else {
      initializeSound(lemonOneSound);
    }
  };

  useEffect(() => {
    if (selectedLemon && seconds) {
      socket?.emit("poll-room", {
        game_session_id: gameSession,
        player_name: username,
        user_id: id,
        info: {
          selected_lemon_number: selectedLemon,
          transition: 1,
          time_to_answer: time - seconds,
        },
      });
      setTimeout(() => {
        setSeconds(undefined);
        setSelectedLemon(undefined);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [selectedLemon]);

  useEffect(() => {
    let intervalId: any;
    if (seconds !== undefined) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          socket?.emit("poll-room", {
            game_session_id: gameSession,
            player_name: username,
            user_id: id,
            info: {
              selected_lemon_number: null,
              transition: 1,
              time_to_answer: time,
            },
          });
          setSeconds(undefined);
          setSelectedLemon(undefined);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [seconds]);

  useEffect(() => {
    if (lemonNumber === lemonNumberNext) setSeconds(time);
  }, [lemonNumber, lemonNumberNext, time]);

  useEffect(() => {
    socket?.on("poll-room", (response: any) => {
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
      } else {
        dispatch(joinGame(response.game_data));
        if (!response.game_data.is_valid_lemon)
          navigate(
            ROUTES.LEMON.RESULT_FOR(gameSession as string, !!notCreator),
          );
      }
    });
    // eslint-disable-next-line
  }, [socket?.connected]);

  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      socket?.emit("heartbeat", {
        game_pin: gamePin,
        player_name: username,
      });
      socket?.on("poll-room", (response: any) => {
        if (response.statusCode !== "00") {
          toast.error("an error occurred");
        } else {
          dispatch(joinGame(response.game_data));
          if (!response.game_data.is_valid_lemon)
            navigate(
              ROUTES.LEMON.RESULT_FOR(gameSession as string, !!notCreator),
            );
        }
      });
    }, 2000);

    return () => {
      clearInterval(heartbeatInterval);
    };
    // eslint-disable-next-line
  }, [gamePin, username]);

  return (
    <AppLayout className="font-lal px-4 pt-[8rem] pb-[4.25rem]">
      {/* {loading ? <Loader /> : null} */}
      <div className="flex flex-col">
        {/* <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          {gameTitle?.replaceAll("-", " ")}
        </h1>
        <p className="font-inter font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-7 capitalize">
          {players.length} Players | {difficulty || difficultyLevel}
        </p> */}

        <div className="relative rounded-[18px] w-full mb-4 max-h-[9.375rem]">
          <img
            loading="lazy"
            src={lemonBg}
            alt="background"
            className="w-full h-full rounded-[18px] object-cover"
          />
          <div className="absolute inset-0 bg-[#393939] opacity-75 rounded-[18px]"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent flex flex-col justify-between px-4 pb-[0.313rem]">
            <div className="flex justify-center items-center">
              <Lemon color="purple" number={lemonNumberPrev as number} />
              {lemonNumberPrev !== lemonNumberNext ? (
                <Lemon
                  color="teal"
                  number={lemonNumberNext as number}
                  className="left-[-1.25rem]"
                />
              ) : null}
            </div>
            {seconds !== undefined ? (
              <div className="w-full bg-white rounded-[3px] h-[0.25rem]">
                <div
                  className="lemon-countdown bg-[#CE0F15] h-[0.25rem] rounded-[3px] transition-all ease-linear duration-1000"
                  style={{ width: `${(seconds / time) * 100}%` }}
                ></div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={`py-1.5 flex justify-center items-center mx-[-1rem] mb-5 ${
            seconds ? "bg-green" : "bg-white"
          }`}
        >
          <p
            className={`text-center text-[1.125rem] leading-[1.75rem] tracking-[-0.15px] ${
              seconds ? "text-white" : "text-black"
            }`}
          >
            {seconds
              ? "Tap on a lemon to select"
              : "Waiting for other lemons (Don't snooze)"}
          </p>
        </div>
        <div className="px-1 grid grid-cols-3 gap-x-4 gap-y-4">
          {lemonsDisplayed.map((l) => (
            <Lemon
              color="white"
              number={l}
              key={l}
              checked={l === selectedLemon}
              onClick={() => {
                if (!selectedLemon && seconds) {
                  handlePlay();
                  setSelectedLemon(l);
                }
              }}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default LemonGame;
