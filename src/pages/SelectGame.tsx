import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import GameCard from "../components/misc/GameCard";
import Loader from "../components/misc/Loader";

import image from "../assets/images/full-logo.svg";

import { AppDispatch, RootState } from "../store";
import { fetchGames, selectGame } from "../store/features/game";
import { GameState } from "../types";

const SelectGame = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, games } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-12">
      <div className="grow px-7 pb-10">
        {loading ? <Loader /> : null}
        <h1 className="font-bold text-[1.5rem] text-center mb-[0.875rem]">
          CHOOSE A GAME
        </h1>
        <p className="font-medium text-[1rem] text-center mb-8">
          {description ||
            `THIS GAME is an exhilarating and fast-paced party game designed for
          bringing fun and excitement to social gatherings or casual play with
          friends. This word-based game is perfect for those who love a mix of
          creativity, quick thinking, and friendly competition.`}
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              image={image}
              pending={!game.isActive}
              onClick={() => {
                if (!game.isActive) return;
                dispatch(
                  selectGame({
                    id: game.id,
                    title: game.name.toLowerCase().replaceAll(" ", "-"),
                  })
                );
                navigate("/" + game.name.toLowerCase().replaceAll(" ", "-"));
              }}
              onMouseEnter={() => setDescription(game.description)}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SelectGame;
