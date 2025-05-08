import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Socket } from "socket.io-client";

import AppLayout from "../../../components/layouts/AppLayout";
import Loader from "../../../components/misc/Loader";
import VanillaInput from "../../../components/forms/VanillaInput";
// import FooterButton from "../../../components/forms/FooterButton";

import check from "../../../assets/images/check-sign-white.svg";

import { titleMap, colorMap } from "../../../helpers/misc";
import { RootState, AppDispatch } from "../../../store";
import {
  endGame,
  fetchGameCategories,
  fetchTrivia,
  selectCategory,
  setTriggerReplay,
} from "../../../store/features/game";
import * as ROUTES from "../../../routes";
import { GameState } from "../../../types";

const ScrambledAvailableTrivia = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [searchParams] = useSearchParams();
  const replay = searchParams.get("replay");

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, game, triggerReplay, gamePin, trivia, time } =
    useSelector<RootState>(({ game }) => game) as GameState;

  const [category, setCategory] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);

  const handleClick = (category: string) => {
    if (category !== "new") dispatch(selectCategory(category));
    if (replay) {
      dispatch(fetchTrivia());
    } else {
      setCategory(category);
      setTimeout(() => {
        navigate(
          category === "new"
            ? ROUTES.SCRAMBLED_WORDS.NEW_GAME
            : ROUTES.PLAY.SELECT_DIFFICULTY_FOR(
                gameTitle?.toLowerCase() as string,
              ),
        );
      }, 500);
    }
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

  // useEffect(() => {
  //   socket?.on("start", (response: any) => {
  //     if (response.statusCode !== "00") {
  //       toast.error("an error occurred");
  //       setLoader(false);
  //     } else {
  //       dispatch(joinGame(response.game_data));
  //       navigate(
  //         ROUTES.PLAY.BEGIN_GAME_FOR(
  //           response.game_data.game_name.toLowerCase().replaceAll(" ", "-"),
  //           response.game_data.game_session_id,
  //         ),
  //       );
  //     }
  //   });
  // }, [gamePin, socket, dispatch, navigate]);

  // console.log( categories );

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-4 pt-[8rem] pb-[4.25rem]">
      {loading || loader ? <Loader /> : null}

      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px] uppercase">
              {titleMap[gameTitle?.toLowerCase() as keyof typeof titleMap]}
            </h1>
          </div>
        </div>

        <div className="flex justify-between">
          <h5 className="text-[1.375rem] ml-2 leading-[2.154rem] tracking-[-0.25px] capitalize">
            Animals Categories
          </h5>
        </div>

        <div className="flex justify-between">
          <p className="ml-2 bolder">Select Trivias (2 of 15 selected)</p>
          {/* <h5 className=" ml-2 leading-[2.154rem] tracking-[-0.25px] capitalize">
            Animals Categories
          </h5> */}
        </div>

        <div className="ml-2 mt-3">
          <VanillaInput
            className="h-[3em] rounded-[7px]"
            type="text"
            placeholder="Search for a trivia"
            value=""
            onChange={() => {}}
          />
        </div>

        <br />

        {categories?.map((c, i) => (
          <div
            className={`bg-[#2C2C2C] rounded-[3px] px-5 py-3 flex ${
              category === c.category_id
                ? `border-[${
                    colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  }] bg-[${
                    colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  }]`
                : "border-white"
            } ${i === categories.length - 1 ? "mb-[9rem]" : "mb-3"}`}
            onClick={() => handleClick(c.category_id)}
            key={i}
            // style={{
            //   backgroundColor:
            //     category === c.category_id
            //       ? colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
            //       : "transparent",
            //   borderColor:
            //     category === c.category_id
            //       ? colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
            //       : "white",
            // }}
          >
            <p className=" capitalize">{c.category_name}</p>

            <img className="ml-auto" loading="lazy" src={check} alt="check" />
          </div>
        ))}
      </div>

      {/* <button
      className="capitalize w-[3.2em] h-[3.2em] rounded-full bg-white font-lal text-[1.5rem] leading-[2.375rem] absolute right-10 tracking-[-0.1px] text-black flex fixed bottom-[4em]">
      
    </button> */}
    </AppLayout>
  );
};

export default ScrambledAvailableTrivia;
