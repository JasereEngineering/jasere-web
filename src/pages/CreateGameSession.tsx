import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
// import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

import helpIcon from "../assets/images/help-icon.svg";

import { titleMap } from "../helpers/misc";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../types";
import { AppDispatch, RootState } from "../store";
import { clearGameSession, createGame } from "../store/features/game";
import { GameState } from "../types";
import * as ROUTES from "../routes";
import FooterButton from "../components/forms/FooterButton";

const CreateGameSession = () => {

  const navigate = useNavigate();
  const { gameTitle } = useParams();

  const { user } = useAuth() as AuthContextType;

  const dispatch = useDispatch<AppDispatch>();
  const { loading, gameSession, sessionCreated } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(createGame({ name }));
    } else {
      navigate(`${ROUTES.AUTH.SIGNIN}?game_name=${name}`);
    }
  };

  useEffect(() => {

    if (gameSession && sessionCreated){
      navigate(ROUTES.PLAY.START_GAME);
    } 
    return () => {
      dispatch(clearGameSession());
    };
  }, [gameSession, sessionCreated, dispatch, navigate]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-4 pt-[8rem] pb-[4.25rem]">
      <div className="flex flex-col grow">
        <div className="flex justify-between">
          <div>
            <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px] uppercase">
              {titleMap[gameTitle?.toLowerCase() as keyof typeof titleMap]}
            </h1>
            <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
              Set a name for your game session
            </p>
          </div>
          <img
            loading="lazy"
            src={helpIcon}
            alt="help"
            className="h-[2rem] w-[2rem] pt-2"
          />
        </div>
        <div className="w-full flex flex-col grow justify-center">
          <Input
            label="Name of Game"
            type="text"
            value={name}
            onChange={setName}
          />
        </div>
      </div>
      {/* <Button
        text="Next"
        onClick={handleSubmit}
        disabled={!name}
        loading={loading}
      /> */}

      <FooterButton text="Next" onClick={handleSubmit} loading={loading} disabled={!name} />
    </AppLayout>
  );
};

export default CreateGameSession;
