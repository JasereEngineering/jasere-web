import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import GameCard from "../components/misc/GameCard";
import Loader from "../components/misc/Loader";

import charades from "../assets/images/charades.jpg";
import lemon from "../assets/images/lemon.jpg";
import words from "../assets/images/words.jpg";
import scrambled from "../assets/images/scrambled.jpg";
import check from "../assets/images/check-sign.svg";

import { colorMap } from "../helpers/misc";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../types";
import { AppDispatch, RootState } from "../store";
import { fetchGames, selectGame } from "../store/features/game";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const imageMap = {
  charades,
  lemon,
  words,
  "scrambled-words": scrambled,
};

const SelectGame = () => {
  const navigate = useNavigate();

  const { user } = useAuth() as AuthContextType;

  const dispatch = useDispatch<AppDispatch>();
  const { loading, games } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) return;

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-12">
      {loading ? <Loader /> : null}
      <div>
        <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
          HOST A GAME
        </h1>
        <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-6">
          Select from our list of popular party games
        </p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {/* <GameCard name="Charades" image={charades} />
          <GameCard name="Scrambled words" image={scrambled} />
          <GameCard name="Lemon lemon" image={lemons} />
          <GameCard name="what word?" image={words} /> */}
          {games.map((game) => (
            <GameCard
              key={game.name}
              name={game.name}
              image={
                imageMap[
                  game.name
                    .toLowerCase()
                    .replaceAll(" ", "-") as keyof typeof imageMap
                ]
              }
              hue={
                colorMap[
                  game.name
                    .toLowerCase()
                    .replaceAll(" ", "-") as keyof typeof imageMap
                ]
              }
              pending={!game.isActive}
              onClick={() => {
                if (!game.isActive) return;
                dispatch(
                  selectGame({
                    id: game.id,
                    title: game.name.toLowerCase().replaceAll(" ", "-"),
                    tag: game.tag
                  })
                );
                navigate(
                  game.tag.includes("lemon")
                    ? ROUTES.PLAY.SELECT_DIFFICULTY_FOR(
                        game.name.toLowerCase().replaceAll(" ", "-")
                      )
                    : ROUTES.PLAY.SELECT_CATEGORY_FOR(
                        game.name.toLowerCase().replaceAll(" ", "-")
                      )
                );
              }}
            />
          ))}
        </div>
      </div>
      {user ? (
        <div className="flex justify-center items-center">
          <div
            className={`max-w-fit bg-[#24E95B] rounded-[10px] px-4 py-3 flex items-center transition-opacity duration-300 ${
              count ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={check} alt="checkmark" className="mr-2" />
            <span className="font-inter text-black text-[0.938rem] leading-[1.172rem] tracking-[-0.18px]">
              Signed in as <span className="font-semibold">{username}</span>
            </span>
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
};

export default SelectGame;
