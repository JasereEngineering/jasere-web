import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Navbar from "../components/navigation/Navbar";
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

  useEffect(() => {
    if (gameSession && sessionCreated)
      navigate(ROUTES.PLAY.PLAY_NOW_FOR("scrambled-words", gameSession));
    return () => {
      dispatch(clearGameSession());
    };
  }, [gameSession, sessionCreated, dispatch, navigate]);

  return (
    <AppLayout className="font-lato flex flex-col">
      <Navbar className="mb-12" />
      <div className="grow pb-[2.5rem] px-[2.375rem]">
        <h1 className="font-pop font-semibold text-[2.125rem]">Hello,</h1>
        <p className="font-pop text-[1.125rem] mb-[1.625rem]">
          Create your game
        </p>
        <div className="mb-8">
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
          className="!bg-pumpkin !font-extrabold mb-3"
          onClick={() => dispatch(createGame(name))}
          loading={loading}
          disabled={!name}
        />
        <h6 className="font-pop italic text-[0.813rem] text-center">
          Note: All the fields with (*) are compulsory
        </h6>
      </div>
    </AppLayout>
  );
};

export default CreateScrambledWordsGame;
