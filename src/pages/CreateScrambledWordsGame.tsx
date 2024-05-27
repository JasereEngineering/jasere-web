import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

import { AppDispatch, RootState } from "../store";
import { clearGameSession, createGame } from "../store/features/game";
import { GameState } from "../types";
import * as ROUTES from "../routes";

const CreateScrambledWordsGame = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, gameSession, sessionCreated } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createGame(name));
  };

  useEffect(() => {
    if (gameSession && sessionCreated)
      navigate(ROUTES.PLAY.PLAY_NOW_FOR("scrambled-words", gameSession));
    return () => {
      dispatch(clearGameSession());
    };
  }, [gameSession, sessionCreated, dispatch, navigate]);

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-12">
      <div className="grow pb-[2.5rem] px-[2.375rem] md:flex md:justify-center md:items-center">
        <form
          onSubmit={handleSubmit}
          className="md:bg-gradient-to-r from-[#1E1E1E] to-[#18365E] rounded-[36px] md:py-[3.125rem] md:px-[11.5rem] md:max-w-[50.313rem]"
        >
          <h1 className="font-pop font-semibold text-[2.125rem] md:text-[1.875rem] md:mb-1.5">
            Hello,
          </h1>
          <p className="font-pop text-[1.125rem] mb-[1.625rem] md:mb-[4.25rem]">
            Create your game
          </p>
          <div className="mb-8 w-[26.625rem]">
            <Input
              label="Title of game"
              placeholder="Enter game title"
              type="text"
              value={name}
              onChange={setName}
              required
            />
          </div>
          <Button
            text="NEXT"
            className="!bg-pumpkin !font-extrabold mb-3 md:!bg-purple"
            loading={loading}
            disabled={!name}
          />
          <h6 className="font-pop italic text-[0.813rem] md:text-[1rem] text-center">
            Note: All the fields with (*) are compulsory
          </h6>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateScrambledWordsGame;
