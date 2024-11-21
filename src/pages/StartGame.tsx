import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QRCode from "react-qr-code";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { Howl } from "howler";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.png";
import copy from "../assets/images/copy.svg";
import check from "../assets/images/check-sign.svg";
import info from "../assets/images/info-icon.svg";
import lemons from "../assets/images/lemon-coloured.svg";
import volumeOn from "../assets/images/volume-on.svg";
import volumeOff from "../assets/images/volume-off.svg";
import lobbySound from "../assets/sounds/lobby-background.mp3";

import { playerColours, colorMap, titleMap } from "../helpers/misc";
import { avatarMap } from "../helpers/misc";
import { joinGame, setPlayers } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { GameState, AuthState } from "../types";
import * as ROUTES from "../routes";
import FooterButton from "../components/forms/FooterButton";
import Image from "../components/misc/Image";

const StartGame = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const notCreator = searchParams.get("player");

  const {
    gameTitle,
    gamePin,
    gameSession,
    categories,
    category,
    levels,
    level,
    players,
    trivia,
    difficulty,
    categoryName,
    avatar: avatarImage,
    lemonNumber,
    time,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;

  const [copied, setCopied] = useState(false);
  const [broadcast, setBroadcast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mute, setMute] = useState(false);

  const gameCategory = categories.find(
    (c) => c.category_id === category,
  )?.category_name;

  const difficultyLevel = levels.find((l) => l.level_value === level)?.level;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`,
    );
    toast.success("Game Link copied successfully. ");
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  };

  const [sound, setSound] = useState<Howl | null>(null);
  const initializeSound = (file: string) => {
    Howler.unload();
    const newSound = new Howl({
      src: [file],
      preload: true, // Preload asynchronously
      //volume: 1.0,
      loop: true,
      xhr: {},
      onload: () => {
        console.log("Sound loaded successfully!");
      },
      onloaderror: (id, error) => {
        console.error("Failed to load sound:", error);
      },
    });
    setSound(newSound);
    newSound.play();
  };
  const handlePlay = () => {
    const resumeAudioContext = () => {
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume().then(() => {
          console.log("AudioContext resumed");
        });
      }
    };
    resumeAudioContext();
    // console.log( sound );
    // console.log( mute );
    if (sound && mute) sound?.pause();
    else if (sound && !mute) sound?.play();
    else initializeSound(lobbySound);
    setMute(!mute);
  };

  useEffect(() => {
    socket?.emit("join", {
      game_pin: gamePin,
      player_name: username,
      avatar: avatarImage,
      user_id: id,
    });

    socket?.on("join", (response: any) => {
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
        navigate(-1);
      } else {
        dispatch(setPlayers(response.players));
        dispatch(joinGame(response.game_data));
      }
      setLoading(false);
    });

    socket?.on("broadcast_lemons", (response: any) => {
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
        setBroadcast(false);
      } else {
        let lemon = response.game_data.players.find(
          (p: any) => p.player_name === username,
        )?.lemon_number;
        dispatch(joinGame({ lemon, players: response.game_data.players }));
        dispatch(setPlayers(response.game_data.players));
        setBroadcast(true);
      }
      setLoading(false);
    });

    socket?.on("start", (response: any) => {
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
      } else {
        dispatch(joinGame(response.game_data));
        // dispatch(setPlayers([]));
        navigate(
          ROUTES.PLAY.BEGIN_GAME_FOR(
            response.game_data.game_name.toLowerCase().replaceAll(" ", "-"),
            response.game_data.game_session_id,
            !!notCreator,
          ),
        );
      }
    });
    // eslint-disable-next-line
    return () => {
      //sound?.unload();
    };
    // eslint-disable-next-line
  }, [socket?.connected]);

  return (
    <AppLayout className="font-lal flex flex-col px-8 pt-[8rem]">
      <div>
        {loading ? <Loader /> : null}
        {!broadcast ? (
          <>
            <div className="flex justify-between mb-3">
              <span></span>
              {mute ? (
                <Image
                  src={volumeOn}
                  alt="Volume On"
                  className=""
                  onClick={() => {
                    setMute(true);
                    handlePlay();
                  }}
                />
              ) : (
                <Image
                  src={volumeOff}
                  alt="Volume Off"
                  className=""
                  onClick={() => {
                    setMute(false);
                    handlePlay();
                  }}
                />
              )}
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
                {
                  titleMap[
                    gameTitle
                      ?.toLowerCase()
                      .replaceAll(" ", "-") as keyof typeof titleMap
                  ]
                }
              </h1>
              <p className="font-inter font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.125rem] capitalize">
                {!gameTitle?.toLowerCase().includes("lemon")
                  ? gameCategory || categoryName
                  : `${players.length} Player${
                      players.length > 1 ? "s" : ""
                    }`}{" "}
                | {difficulty || difficultyLevel}
              </p>
              <div
                className={`bg-[${
                  colorMap[
                    gameTitle
                      ?.toLowerCase()
                      .replaceAll(" ", "-") as keyof typeof colorMap
                  ]
                }] rounded-[10px] p-[0.625rem] font-lal text-[1.375rem] leading-[1.25rem] tracking-[-0.18px] flex flex-col mb-3`}
                style={{
                  backgroundColor:
                    colorMap[
                      gameTitle
                        ?.toLowerCase()
                        .replaceAll(" ", "-") as keyof typeof colorMap
                    ],
                }}
              >
                <span className="text-center">GAME CODE</span>
                <span className="text-center">{gamePin}</span>
              </div>
              <br />

              {!notCreator && (
                <div className="rounded-[10px] p-1 border border-white w-[7.125rem] h-[7.125rem] mb-6">
                  <QRCode
                    style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                    value={`${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
                  />
                </div>
              )}

              {notCreator ? (
                <div className="flex justify-center items-center mb-6">
                  <div className="max-w-fit bg-[#24E95B] rounded-[10px] px-4 py-3 flex items-center">
                    <Image src={check} alt="checkmark" className="mr-2" />

                    <span className="font-inter text-black text-[0.938rem] leading-[1.172rem] tracking-[-0.18px]">
                      Joined as{" "}
                      <span className="font-semibold capitalize">
                        {username}
                      </span>
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-inter text-[0.875rem] text-center leading-[1.094rem] tracking-[-0.4px] mb-2">
                    Share link below to invite friends to your game
                  </p>
                  <div
                    className={`flex w-full mb-6 ${
                      copied ? "opacity-50" : "opacity-100"
                    } transition-opacity duration-300`}
                    onClick={handleCopy}
                  >
                    <div className="bg-[#313131] w-[3rem] flex justify-center items-center rounded-l-[5px]">
                      <img loading="lazy" src={copy} alt="copy" />
                    </div>
                    <div className="grow bg-[#4A4A4A] p-2 flex items-center font-light rounded-r-[5px] truncate">
                      {`${process.env.REACT_APP_URL}${ROUTES.PLAY.JOIN_GAME}?code=${gamePin}`}
                    </div>
                  </div>
                </>
              )}
              <h3 className="font-lal text-[1rem] text-center leading-[1.625rem] mb-4">
                Players in the lobby: {players.length}
              </h3>
              <div className="grid grid-cols-3 gap-[0.625rem] mb-[12rem]">
                {players.map((p, i) => (
                  <div
                    className={`rounded-[25px] flex items-center min-w-[5.375rem] p-1.5 bg-[${
                      playerColours[i % playerColours.length]
                    }]`}
                    key={i}
                    style={{
                      backgroundColor: playerColours[i % playerColours.length],
                    }}
                  >
                    <img
                      loading="lazy"
                      src={
                        p.avatar
                          ? avatarMap[p.avatar as keyof typeof avatarMap]
                          : avatar
                      }
                      alt="avatar"
                      className="h-[1.875rem] w-[1.875rem] rounded-full"
                    />
                    <p className="grow text-center text-black text-[0.813rem] leading-[1.313rem] tracking-[-0.34px] capitalize truncate">
                      {p.player_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <FooterButton
              text={notCreator ? "Waiting For Host..." : "Let's Play"}
              disabled={!!notCreator}
              onClick={() => {
                
                setLoading(true);
                if (gameTitle?.toLowerCase().includes("lemon")) {
                  socket?.emit("broadcast-lemons", {
                    game_pin: gamePin,
                    game_session_id: gameSession,
                  });
                } else {
                  sound?.unload();
                  socket?.emit("start", {
                    game_pin: gamePin,
                    game_data: {
                      trivia,
                      time,
                    },
                  });
                }
              }}
            />
          </>
        ) : (
          <>
            <div className="flex justify-between mb-3">
              <span></span>

              {mute ? (
                <Image
                  src={volumeOn}
                  alt="Volume On"
                  className=""
                  onClick={() => {
                    setMute(true);
                    handlePlay();
                  }}
                />
              ) : (
                <Image
                  src={volumeOff}
                  alt="Volume Off"
                  className=""
                  onClick={() => {
                    setMute(false);
                    handlePlay();
                  }}
                />
              )}
            </div>
            <div className="flex flex-col items-center mb-10">
              <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
                {
                  titleMap[
                    gameTitle
                      ?.toLowerCase()
                      .replaceAll(" ", "-") as keyof typeof titleMap
                  ]
                }
              </h1>
              <p className="font-inter font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-9 capitalize">
                {!gameTitle?.toLowerCase().includes("lemon")
                  ? gameCategory || categoryName
                  : `${players.length} Player${
                      players.length > 1 ? "s" : ""
                    }`}{" "}
                | {difficulty || difficultyLevel}
              </p>
              <h3 className="text-[1.375rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-5">
                You have been assigned as
              </h3>
              <img loading="lazy" src={lemons} alt="lemons" />
              <h2 className="text-[2rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-12">
                LEMON {lemonNumber}
              </h2>
              <div className="flex mb-11">
                <img
                  loading="lazy"
                  src={info}
                  alt="info"
                  className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
                />
                <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                  Lemon numbers are assigned to players at random for a more
                  immersive experience
                </p>
              </div>
              <h4 className="text-center text-[1.061rem] leading-[1.664rem] tracking-[-0.34px] mb-4">
                Assigned Lemons:
              </h4>
              <div className="grid grid-cols-3 gap-x-4 gap-y-[0.625rem] mb-[12rem]">
                {players.map((p, i) => (
                  <div
                    className={`rounded-[25px] flex items-center justify-between min-w-[5.125rem] p-1.5 bg-[${
                      playerColours[i % playerColours.length]
                    }]`}
                    key={i}
                    style={{
                      backgroundColor: playerColours[i % playerColours.length],
                    }}
                  >
                    <img
                      loading="lazy"
                      src={
                        p.avatar
                          ? avatarMap[p.avatar as keyof typeof avatarMap]
                          : avatar
                      }
                      alt="avatar"
                      className="h-[1.875rem] w-[1.875rem] rounded-full"
                    />
                    <div className="bg-white rounded-full flex items-center justify-center text-crimson font-inter font-black text-[1.048rem] leading-[1.269rem] tracking-[-0.19px] w-[1.875rem] h-[1.875rem]">
                      {p.lemon_number}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <FooterButton
              text={notCreator ? "Waiting For Host..." : "Let's Play"}
              disabled={!!notCreator}
              onClick={() => {
                // sound?.pause();
                // sound?.stop();
                sound?.unload();
                //setMute( true );
                setLoading(true);
                socket?.emit("start", {
                  game_pin: gamePin,
                  avatar: avatarImage,
                  game_data: {
                    time,
                  },
                });
              }}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default StartGame;
