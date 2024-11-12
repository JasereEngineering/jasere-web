import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.png";
import share from "../assets/images/share.svg";

import { avatarMap } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { endGame, joinGame, resetGame } from "../store/features/game";
//import { playerColours } from "../helpers/misc";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";
import BottomModal from "../components/misc/BottomModal";
import replay from "../assets/images/replay.svg";
import whatsapp from "../assets/images/whatsapp.svg";
import twitter from "../assets/images/twitter.svg";
import webSvg from "../assets/images/web-link.svg";
import category from "../assets/images/category.svg";
import pad from "../assets/images/game-pad.svg";

const Leaderboard = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameSession } = useParams();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");

  const dispatch = useDispatch<AppDispatch>();
  const {
    //categoryName,
    difficulty,
    //gameTitle,
    gamePin,
    avatar: avatarImage,
    trivia,
    time,
  } = useSelector<RootState>(({ game }) => game) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;

  const [result, setResult] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const playerPositionRef = useRef<number>(0);

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
      console.log({ response });
      if (response.statusCode !== "00") {
        toast.error("an error occurred");
        setLoading(false);
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
            (a: any, b: any) => b.point - a.point,
          ),
        );
      }
    });
  }, [
    gamePin,
    gameSession,
    socket,
    avatarImage,
    username,
    id,
    notCreator,
    dispatch,
    navigate,
  ]);
  const leaderboardHeights: number[] = [7.25, 10.25, 13.25];
  const numberToPosition = (num: number): string => {
    const suffix = ["th", "st", "nd", "rd"];
    const lastDigit = num % 10;
    const secondLastDigit = Math.floor((num % 100) / 10);

    if (secondLastDigit === 1) {
      return num + "th";
    } else {
      return num + suffix[lastDigit];
    }
  };
  const location = useLocation();
  const modalOption = useRef<string>("");
  const query = new URLSearchParams(location.search);
  // const currentShareUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}?q=share`;
  
  const currentShareUrl = `${window.location.origin}?q=share`;
  const shareValue = query.get("q") || "";
  const encodedUrl = encodeURIComponent(currentShareUrl);
  //const encodedTitle = encodeURIComponent("Test Title (Jasere)");
  const encodedText = encodeURIComponent(
    `Think you can do better?Check out exciting games on ${process.env.REACT_APP_URL}`,
  );
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const resetBottomModal = () => setModal(false);

  return (
    <AppLayout className="font-lal flex flex-col absolute pt-[8rem]">
      {!result.length || loading ? <Loader /> : null}
      <div className="flex flex-col items-center px-[2.813rem] pb-[8rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          LEADERBOARD
        </h1>
        <div
          className={`grid grid-cols-${result.slice(0, 3).length || 0} gap-x-5 w-full items-center mt-2 mb-10`}
        >
          {result
            .slice(0, 3)
            .reverse()
            .map((r: any, index: number) => (
              <div className="place-self-end w-full" key={index}>
                <div className="flex justify-center mb-2">
                  <img
                    loading="lazy"
                    src={
                      r?.avatar
                        ? avatarMap[r?.avatar as keyof typeof avatarMap]
                        : avatar
                    }
                    alt="avatar"
                    className="h-[3.375rem] w-[3.375rem] rounded-full"
                  />
                </div>

                <div className="flex justify-center border-0 border-white z-10">
                  <p className="font-thin text-[1.25rem]">{r.player_name}</p>
                </div>
                <div className="flex justify-center mb-5 border-0 border-white">
                  <p className="font-light font-inter text-[0.85rem] tracking-tighter">
                    {r.point} Point(s)
                  </p>
                </div>
                <div
                  style={{
                    height: ` ${leaderboardHeights[index]}rem`,
                  }}
                  className={`flex place-items-center justify-center  bg-white text-black rounded-[15px] font-lal text-[2.7rem]`}
                >
                  <label>
                    {result.findIndex(
                      (res: any) => res.player_name === r.player_name,
                    ) + 1}
                  </label>
                </div>
              </div>
            ))}
        </div>
        {result.length > 3 ? (
          result.slice(3, result.length).map((r: any, i: number) => (
            <div
              key={i}
              className={`w-full ${
                !(
                  (result[i].player_name || "").toLowerCase() ===
                    (username || "").toLowerCase() ||
                  // eslint-disable-next-line
                  (
                    (result[i + 1] && result[i + 1].player_name) ||
                    ""
                  ).toLowerCase() === (username || "").toLowerCase()
                ) && "border-b border-[#EEEEEE]-50"
              }`}
            >
              {(r.player_name || "").toLowerCase() ===
              (username || "").toLowerCase() ? (
                <div
                  className={`flex justify-between items-center rounded-[25px] p-6 w-full mb-[0.625rem] h-[4.93rem] bg-[#FBAF00]
                          }]`}
                >
                  <span className="hidden">
                    {" "}
                    {(playerPositionRef.current = 1)}{" "}
                  </span>
                  <div className="border-0 border-white">
                    <img
                      loading="lazy"
                      src={
                        r?.avatar
                          ? avatarMap[r?.avatar as keyof typeof avatarMap]
                          : avatar
                      }
                      alt="avatar"
                      className="mr-1.5 h-[2rem] it w-[2rem] rounded-full"
                    />
                    <span className="font-lal text-[0.875rem] tracking-[-0.34px] capitalize">
                      {r.player_name}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-px bg-white h-10"></div>
                  </div>

                  <div className="place-items-center">
                    <h3> Position </h3>
                    <p>
                      {numberToPosition(
                        result.length <= result.slice(0, 3).length
                          ? i + 1
                          : i + 1 + 3,
                      )}
                    </p>
                  </div>

                  <div>
                    <h3> Difficulty </h3>
                    <p>{difficulty}</p>
                  </div>

                  <div>
                    <h3> Points </h3>
                    <p>{r.point}pts</p>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex justify-between items-center rounded-[25px] } p-1.5 pr-3 w-full mb-[0.625rem] 
                          }]`}
                >
                  <span style={{ display: "none" }}>
                    {" "}
                    {(playerPositionRef.current = 0)}{" "}
                  </span>

                  <div className="flex items-center">
                    <span className="text-[2.7rem]">{i + 1 + 3}</span>
                    <img
                      loading="lazy"
                      src={
                        r.avatar
                          ? avatarMap[r.avatar as keyof typeof avatarMap]
                          : avatar
                      }
                      alt="avatar"
                      className="mr-1.5 ml-3 h-[1.875rem] w-[1.875rem] rounded-full"
                    />
                    <span className="font-lal  text-[0.875rem] leading-[1.313rem] tracking-[-0.34px] capitalize">
                      {r.player_name}
                    </span>
                  </div>

                  <div className="flex flex-row-reverse items-center gap-x-1">
                    <span className="font-lex text-[0.688rem] leading-[0.859rem] tracking-[-0.34px] mr-6">
                      {r.point}pts
                    </span>
                    {/* {i === 0 ? <img loading="lazy" src={crown} alt="champ" /> : null} */}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-full">
            {result.findIndex((res: any) => res.player_name === username) >
              -1 && (
              <div
                className={`flex justify-between items-center rounded-[25px] p-6 w-full mb-[0.625rem] h-[4.93rem] bg-[#FBAF00]
                  }]`}
              >
                <span className="hidden">
                  {" "}
                  {(playerPositionRef.current = 1)}{" "}
                </span>
                <div className="border-0 border-white">
                  <img
                    loading="lazy"
                    src={
                      result[
                        result.findIndex(
                          (res: any) => res.player_name === username,
                        )
                      ].avatar
                        ? avatarMap[
                            result[
                              result.findIndex(
                                (res: any) => res.player_name === username,
                              )
                            ].avatar as keyof typeof avatarMap
                          ]
                        : avatar
                    }
                    alt="avatar"
                    className="mr-1.5 h-[2rem] it w-[2rem] rounded-full"
                  />
                  <span className="font-lal text-[0.875rem] tracking-[-0.34px] capitalize">
                    {
                      result[
                        result.findIndex(
                          (res: any) => res.player_name === username,
                        )
                      ].player_name
                    }
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="w-px bg-white h-10"></div>
                </div>

                <div className="place-items-center">
                  <h3> Position </h3>
                  <p>
                    {numberToPosition(
                      result.findIndex(
                        (res: any) => res.player_name === username,
                      ) + 1,
                    )}
                  </p>
                </div>

                <div>
                  <h3> Difficulty </h3>
                  <p>{difficulty}</p>
                </div>

                <div>
                  <h3> Points </h3>
                  <p>
                    {
                      result[
                        result.findIndex(
                          (res: any) => res.player_name === username,
                        )
                      ].point
                    }
                    pts
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!shareValue && (
          <div className="border border-white rounded-[30px] py-1 px-[0.625rem] mt-[0.625rem] flex items-center">
            <img loading="lazy" src={share} alt="share" className="mr-2" />
            <span
              onClick={() => {
                modalOption.current = "share";
                setModal(true);
              }}
              className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px] cursor-pointer"
            >
              Share
            </span>
          </div>
        )}
      </div>

      {!shareValue && (
        <button
          className={`capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full fixed bottom-0 left-0 right-0 ${
            notCreator ? "opacity-75" : ""
          }`}
          onClick={() => {
            modalOption.current = "replay";
            setModal(true);
          }}
          disabled={!!notCreator}
        >
          {notCreator ? "WAITING FOR HOST..." : "NEXT"}
        </button>
      )}

      <BottomModal onClose={() => setModal(false)} showModal={modal}>
        {modalOption.current === "replay" ? (
          <div className="px-[2.625rem] pb-[5rem]">
            <h3 className="text-[1.5rem] text-center text-white leading-[2.351rem] tracking-[1px] mb-6">
              Choose an Option
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div
                className="border border-white rounded-[9px] flex flex-col items-center pt-11 pb-[1.875rem]"
                onClick={() => {
                  setLoading(true);
                  dispatch(resetGame());
                  socket?.emit("start", {
                    game_pin: gamePin,
                    game_data: {
                      trivia,
                      time,
                    },
                  });
                }}
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
                onClick={() => {
                  navigate(ROUTES.CORRECT.CATEGORY + "?replay=true");
                }}
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
                onClick={() => {
                  dispatch(endGame());
                  socket?.emit("exit", {
                    game_pin: gamePin,
                  });
                }}
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
        ) : (
          <div className="px-[2.625rem] pb-[5rem]">
            <h3 className="text-[1.5rem] text-center text-white leading-[2.351rem] tracking-[1px] mb-6">
              Share to
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="border border-white rounded-[9px] flex flex-col items-center pt-11 pb-[1.875rem]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={resetBottomModal}
                >
                  <img
                    loading="lazy"
                    src={whatsapp}
                    alt="WhatsApp"
                    className="mb-7 w-[3.375rem] h-[3.375rem]"
                  />
                </a>

                <p className="text-[1rem] leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                  WhatsApp
                </p>
              </div>

              <div className="border border-white rounded-[9px] flex flex-col items-center pt-11">
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={resetBottomModal}
                >
                  <img
                    loading="lazy"
                    src={twitter}
                    alt="X"
                    className="mb-7 w-[3.375rem] h-[3.375rem]"
                  />
                </a>
                <p className="text-[1rem] text-center leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                  X
                </p>
              </div>

              <div className="border border-white rounded-[9px] flex flex-col items-center justify-center col-span-2 h-[9.375rem]">
                <a
                  href={currentShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={resetBottomModal}
                >
                  <img
                    loading="lazy"
                    src={webSvg}
                    alt="Share Link"
                    className="mb-7 w-[3.375rem] h-[3.375rem]"
                  />
                </a>
                <p className="text-[1rem] text-center leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                  Share Link
                </p>
              </div>

              {/* <div
              className="border border-white rounded-[9px] flex flex-col items-center pt-11"
              onClick={() => {
                navigate(ROUTES.CORRECT.CATEGORY + "?replay=true");
              }}
            >
              <img
                loading="lazy"
                src={category}
                alt="category"
                className="mb-7 w-[3.375rem] h-[3.375rem]"
              />
              <p className="text-[1rem] text-center leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                Snapchat
              </p>
            </div>

            <div
              className="border border-white rounded-[9px] flex flex-col items-center pt-11"
            >
              <img
                loading="lazy"
                src={category}
                alt="category"
                className="mb-7 w-[3.375rem] h-[3.375rem]"
              />
              <p className="text-[1rem] text-center leading-[1.567rem] tracking-[-0.1px] max-w-[6.375rem]">
                Instagram
              </p>
            </div> */}
            </div>
          </div>
        )}
      </BottomModal>
    </AppLayout>
  );
};

export default Leaderboard;
