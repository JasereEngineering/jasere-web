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
import BottomModal from "../components/misc/BottomModal";

import avatar from "../assets/images/avatar2.png";
import share from "../assets/images/share.svg";
import GoldTrophy from "../assets/images/trophy.svg";
import SilverTrophy from "../assets/images/silverTrophy.svg";
import BronzeTrophy from "../assets/images/bronzeTrophy.svg";

import replay from "../assets/images/replay.svg";
import whatsapp from "../assets/images/whatsapp.svg";
import twitter from "../assets/images/twitter.svg";
import webSvg from "../assets/images/web-link.svg";
import category from "../assets/images/category.svg";
import pad from "../assets/images/game-pad.svg";

import { avatarMap } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { endGame, joinGame, resetGame } from "../store/features/game";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const Leaderboard = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameSession } = useParams();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");

  const dispatch = useDispatch<AppDispatch>();
  const {
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

  console.log("username", username);

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

  const currentUserResult = result.find(
    (res: any) => res.player_name.toLowerCase() === username?.toLowerCase(),
  );
  const userPosition = currentUserResult
    ? result.findIndex(
        (res: any) => res.player_name.toLowerCase() === username?.toLowerCase(),
      ) + 1
    : null;

  const getPositionMessage = (position: number | null) => {
    if (!position) return "";
    switch (position) {
      case 1:
        return "Can’t touch this, Congrats Champ!";
      case 2:
        return "Congratulations, sitting pretty at second";
      case 3:
        return "Congrats, you made it to the podium!";
      default:
        return "You almost made it!, try harder next time";
    }
  };

  const getTrophy = (position: number) => {
    const numberToPosition = (num: number): string => {
      const suffix = ["th", "st", "nd", "rd"];
      const lastDigit = num % 10;
      const secondLastDigit = Math.floor((num % 100) / 10);

      if (secondLastDigit === 1) {
        return num.toString() + "th";
      }
      return num.toString() + (suffix[lastDigit] || "th");
    };

    switch (position) {
      case 1:
        return { src: GoldTrophy, alt: "1st" };
      case 2:
        return { src: SilverTrophy, alt: "2nd" };
      case 3:
        return { src: BronzeTrophy, alt: "3rd" };
      default:
        return { src: undefined, alt: numberToPosition(position) };
    }
  };

  const location = useLocation();
  const modalOption = useRef<string>("");
  const query = new URLSearchParams(location.search);
  const currentShareUrl = `${window.location.origin}?q=share`;
  const shareValue = query.get("q") || "";
  const encodedUrl = encodeURIComponent(currentShareUrl);
  const url = process.env.REACT_APP_URL || "";
  const shareText = process.env.REACT_APP_SHARE_TEXT || "";
  const title = process.env.REACT_APP_SHARE_TITLE || "";
  const encodedText = `${shareText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const resetBottomModal = () => setModal(false);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: encodedText,
          url,
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      console.warn("Web Share API is not supported in this browser.");
    }
  };

  return (
    <AppLayout className="font-lal flex flex-col absolute pt-[8rem]">
      {!result.length || loading ? <Loader /> : null}
      <div className="flex flex-col items-center px-3 pb-[8rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px] uppercase">
          CONGRATULATIONS
        </h1>
        {currentUserResult && (
          <div className="mt-4 flex flex-col items-center">
            {result.length === 2 ? (
              <img
                src={userPosition === 1 ? GoldTrophy : SilverTrophy}
                alt={userPosition === 1 ? "Gold Trophy" : "Silver Trophy"}
                className="h-[88px] w-[88px]"
              />
            ) : (
              <img
                loading="lazy"
                src={
                  currentUserResult.avatar
                    ? avatarMap[
                        currentUserResult.avatar as keyof typeof avatarMap
                      ]
                    : avatar
                }
                alt="user avatar"
                className="h-[75px] w-[75px] rounded-full"
              />
            )}
            <p className="mt-5 text-xl text-center font-lal leading-[1.5rem] tracking-[-0.1px]">
              {getPositionMessage(userPosition)}
            </p>
          </div>
        )}

        {result.length === 2 ? (
          <div className="flex flex-col gap-4 my-8 w-full">
            {result.map((res: any, index: number) => (
              <div
                key={res.player_name}
                className={`px-4 py-3 rounded-xl flex items-center gap-6 ${
                  index === 1 ? "w-[93%] mx-auto" : "w-full"
                }`}
                style={{
                  background:
                    index === 1
                      ? "linear-gradient(90deg, #FBAF00 0%, #956800 100%)"
                      : "#FFFFFF",
                }}
              >
                <div className="flex flex-col items-center">
                  <img
                    loading="lazy"
                    src={
                      res.avatar
                        ? avatarMap[res.avatar as keyof typeof avatarMap]
                        : avatar
                    }
                    alt={`${res.player_name}'s avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <p
                    className="text-sm font-bold"
                    style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                  >
                    {res.player_name.toLowerCase() === username?.toLowerCase()
                      ? "You"
                      : res.player_name}
                  </p>
                </div>

                <div className="bg-[#30302F] w-[1px] h-[80%]" />

                <div className="flex gap-4 items-start">
                  <div className="flex flex-col items-start gap-2">
                    <p
                      className="text-sm"
                      style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                    >
                      Points
                    </p>
                    <p
                      className="font-manjari text-sm font-bold"
                      style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                    >
                      {res.point || 0}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p
                      className="text-sm"
                      style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                    >
                      Time spent
                    </p>
                    <p
                      className="font-manjari text-sm font-bold"
                      style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                    >
                      N/A
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p
                      className="text-sm"
                      style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                    >
                      Position
                    </p>
                    <p
                      className="font-manjari text-sm font-bold"
                      style={{ color: index === 1 ? "#FFFFFF" : "#30302F" }}
                    >
                      {index === 0 ? "1st" : "2nd"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-3.5 my-8 bg-white rounded-xl w-full flex items-center gap-6">
            <div className="flex flex-col items-center">
              {userPosition !== null && getTrophy(userPosition).src ? (
                <img
                  src={getTrophy(userPosition).src}
                  alt={getTrophy(userPosition).alt}
                  className="w-12 h-12"
                />
              ) : userPosition !== null ? (
                <div className="text-[55px] text-black font-bold">
                  {userPosition}
                </div>
              ) : null}
              {userPosition !== null && !getTrophy(userPosition).src ? (
                <div className="text-sm text-[#30302F] font-bold">
                  {getTrophy(userPosition).alt}
                </div>
              ) : null}
            </div>

            <div className="bg-[#30302F] w-[1px] h-[80%]" />

            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-start gap-2">
                <p className="text-[#30302F] text-sm">Points</p>
                <p className="font-manjari text-[#30302F] text-sm">
                  {currentUserResult?.point || 0}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-[#30302F] text-sm">Time spent</p>
                <p className="font-manjari text-[#30302F] text-sm">N/A</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-[#30302F] text-sm">Highest Score</p>
                <p className="font-manjari text-[#30302F] text-sm">
                  {result[0]?.point || 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {!shareValue && (
          <div
            className="border border-white rounded-[30px] py-1 px-[0.625rem] mt-[0.625rem] flex items-center"
            onClick={handleShare}
          >
            <img loading="lazy" src={share} alt="share" className="mr-2" />
            <span className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px] cursor-pointer">
              Share
            </span>
          </div>
        )}
        {result.length >= 3 && (
          <>
            <h2 className="text-[22px] w-full text-white font-bold mb-2 mt-6 text-start">
              Your performance:
            </h2>
            <div className="bg-[#2B2B2B] font-manjari rounded-[20px] w-full py-[27px] px-[18px]">
              <div className="flex justify-between">
                <span className="text-sm tracking-[-0.16px]">QUESTION 1</span>
                <span className="text-[#24E95B]">+18 PTS</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-white text-[10px]">Time Bonus</span>
                <span className="text-[#24E95B] text-[10px]">+10 PTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm tracking-[-0.16px]">QUESTION 2</span>
                <span className="text-[#24E95B]">+18 PTS</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-white text-[10px]">Time Bonus</span>
                <span className="text-[#24E95B] text-[10px]">+10 PTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm tracking-[-0.16px]">QUESTION 3</span>
                <span className="text-[#24E95B] ">+18 PTS</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-white text-[10px]">Time Bonus</span>
                <span className="text-[#24E95B] text-[10px]">+10 PTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm tracking-[-0.16px]">QUESTION 4</span>
                <span className="text-[#24E95B]">+18 PTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-[10px]">Time Bonus</span>
                <span className="text-[#24E95B] text-[10px]">+10 PTS</span>
              </div>
            </div>
          </>
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
            </div>
          </div>
        )}
      </BottomModal>
    </AppLayout>
  );
};

export default Leaderboard;
