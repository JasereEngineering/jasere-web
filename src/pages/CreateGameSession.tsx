import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import RoundedButton from "../components/forms/RoundedButton";

import scrambled from "../assets/images/scrambled.jpg";

import { titleMap, colorMap } from "../helpers/misc";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../types";
import { AppDispatch, RootState } from "../store";
import { clearGameSession, createGame } from "../store/features/game";
import { GameState } from "../types";
import * as ROUTES from "../routes";

const CreateGameSession = () => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();

  const { user } = useAuth() as AuthContextType;

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector<RootState>(({ game }) => game) as GameState;

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(
        createGame({
          name,
          onSuccess: () => {
            navigate(
              ROUTES.SCRAMBLED_WORDS.AVAILABLE_CATEGORY_FOR(
                gameTitle as string,
              ),
            );
          },
        }),
      );
    } else {
      navigate(`${ROUTES.AUTH.SIGNIN}?game_name=${name}`);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearGameSession());
    };
  }, [dispatch]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col grow">
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
          </div>
        </div>
        <div className="w-full flex flex-col grow mt-5 p-4">
          <h3 className="font-lal text-2xl mb-5">Create a Game</h3>
          <Input
            label="Name of Game"
            type="text"
            value={name}
            onChange={setName}
          />
        </div>
      </div>
      <RoundedButton
        text="Next"
        onClick={handleSubmit}
        loading={loading}
        disabled={!name}
      />
    </AppLayout>
  );
};

export default CreateGameSession;
