import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

import helpIcon from "../assets/images/help-icon.svg";

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
      navigate(ROUTES.PLAY.START_GAME_FOR("scrambled-words", gameSession));
    return () => {
      dispatch(clearGameSession());
    };
  }, [gameSession, sessionCreated, dispatch, navigate]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-4 pt-[8rem] pb-[4.25rem]">
      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
              SCRAMBLED WORDS
            </h1>
            <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
              Choose Category
            </p>
          </div>
          <img src={helpIcon} alt="help" className="h-[2rem] w-[2rem] pt-2" />
        </div>
        <div className="w-full">
          <Input
            label="Name of Game"
            type="text"
            value={name}
            onChange={setName}
          />
        </div>
      </div>
      <Button
        text="Next"
        onClick={handleSubmit}
        disabled={!name}
        loading={loading}
      />
    </AppLayout>
  );
};

export default CreateScrambledWordsGame;
