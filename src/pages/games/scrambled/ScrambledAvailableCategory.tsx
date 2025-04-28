import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";

import AppLayout from "../../../components/layouts/AppLayout";
import Loader from "../../../components/misc/Loader";

import scrambled from "../../../assets/images/scrambled.jpg";
import edit from "../../../assets/images/edit-white.svg";
import add from "../../../assets/images/add.svg";
import chevronRight from "../../../assets/images/chevron-right.svg";
import yellowBadge from "../../../assets/images/yellow-badge.svg";

import { titleMap, colorMap } from "../../../helpers/misc";
import { RootState, AppDispatch } from "../../../store";
import {
  endGame,
  fetchGameCategories,
  setTriggerReplay,
} from "../../../store/features/game";
import * as ROUTES from "../../../routes";
import { GameState } from "../../../types";
// import FooterButton from "../../../components/forms/FooterButton";

const ScrambledAvailableCategory = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [searchParams] = useSearchParams();
  const replay = searchParams.get("replay");

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, game, triggerReplay, gamePin, trivia, time } =
    useSelector<RootState>(({ game }) => game) as GameState;

  const [category, setCategory] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  const navigateToCategoryTrivia = (category: string) => {
    // if (category !== "new") dispatch(selectCategory(category));
    // if (replay) {
    //   dispatch(fetchTrivia());
    // } else {
    //   setCategory(category);
    //   setTimeout(() => {
    //     navigate(
    //       category === "new"
    //         ? ROUTES.SCRAMBLED_WORDS.NEW_GAME
    //         : ROUTES.PLAY.SELECT_DIFFICULTY_FOR(
    //             gameTitle?.toLowerCase() as string,
    //           ),
    //     );
    //   }, 500);
    // }

    navigate(ROUTES.SCRAMBLED_WORDS.AVAILABLE_CATEGORY_TRIVIA);
  };

  useEffect(() => {
    dispatch(fetchGameCategories(game as string));
    dispatch(endGame());
  }, [dispatch, game]);

  useEffect(() => {
    if (!categories.length) return;
  }, [categories]);

  useEffect(() => {
    if (triggerReplay && socket) {
      setLoader(true);
      socket?.emit("start", {
        game_pin: gamePin,
        game_data: {
          trivia,
          time,
        },
      });
    }

    return () => {
      if (socket) dispatch(setTriggerReplay(false));
    };
    // eslint-disable-next-line
  }, [triggerReplay, socket]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      {loading || loader ? <Loader /> : null}

      <div>
        <div className="flex justify-between">
          <div className="h-[115px] w-full relative">
            <img
              loading="lazy"
              src={scrambled}
              alt={gameTitle}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute bottom-0 top-0 left-0 inset-0 opacity-75"
              style={{
                backgroundColor:
                  colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap] ||
                  "#000000",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-start justify-center p-4 pl-5">
              <h1 className="-4 text-2xl leading-[28px] tracking-[-0.25px] uppercase">
                {titleMap[gameTitle?.toLowerCase() as keyof typeof titleMap]}
              </h1>
              <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                Edit custom categories
              </p>
            </div>
            <button className="absolute right-5 top-1/2 transform -translate-y-1/2">
              <img src={edit} alt="edit icon" loading="lazy" />
            </button>
          </div>
        </div>

        <div className="flex justify-between px-5 pt-8">
          <h5 className="text-[24px] tracking-[-0.4px] capitalize">
            Available Categories
          </h5>

          <button
            onClick={() =>
              navigate(
                ROUTES.SCRAMBLED_WORDS.ADD_NEW_CATEGORY_FOR("scrambled-words"),
              )
            }
          >
            <img
              className="ml-auto mt-[-4px]"
              loading="lazy"
              src={add}
              alt="add"
            />
          </button>
        </div>

        <br />

        <div className="px-[18px]">
          {categories?.map((c, i) => (
            <div
              className={`border rounded-[20px] px-5 py-3 flex ${
                category === c.category_id
                  ? `border-[${
                      colorMap[
                        gameTitle?.toLowerCase() as keyof typeof colorMap
                      ]
                    }] bg-[${
                      colorMap[
                        gameTitle?.toLowerCase() as keyof typeof colorMap
                      ]
                    }]`
                  : "border-white"
              } ${i === categories.length - 1 ? "mb-[9rem]" : "mb-3"}`}
              onClick={() => navigateToCategoryTrivia(c.category_id)}
              key={i}
              style={{
                backgroundColor:
                  category === c.category_id
                    ? colorMap[
                        gameTitle?.toLowerCase() as keyof typeof colorMap
                      ]
                    : "transparent",
                borderColor:
                  category === c.category_id
                    ? colorMap[
                        gameTitle?.toLowerCase() as keyof typeof colorMap
                      ]
                    : "white",
              }}
            >
              <h5 className="text-[1.375rem] uppercase leading-[2.154rem] tracking-[-0.25px]">
                {c.category_name}
              </h5>
              <img
                loading="lazy"
                src={yellowBadge}
                alt="badge"
                className="ml-[4px] mb-[6px]"
              />
              <img
                className="ml-auto"
                loading="lazy"
                src={chevronRight}
                alt="chevron right"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <button
      className="capitalize w-[3.2em] h-[3.2em] rounded-full bg-white font-lal text-[1.5rem] leading-[2.375rem] absolute right-10 tracking-[-0.1px] text-black flex fixed bottom-[4em]">
      
    </button> */}
    </AppLayout>
  );
};

export default ScrambledAvailableCategory;
