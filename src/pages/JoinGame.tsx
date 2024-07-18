import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import OtpInput from "../components/forms/OtpInput";
import Input from "../components/forms/Input";

import info from "../assets/images/info-icon.svg";

import { AppDispatch, RootState } from "../store";
import { AuthState } from "../types";
import { addGuest } from "../store/features/auth";
import { joinGame } from "../store/features/game";
import * as ROUTES from "../routes";

const JoinGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const { username: name } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  const gamePin = searchParams.get("code");

  const [code, setCode] = useState(gamePin || "");
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState(name || "");

  const onChange = (value: string) => setCode(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addGuest(username));
    dispatch(joinGame({ game_pin: code }));
    navigate(ROUTES.PLAY.START_GAME_GUEST);
  };

  return (
    <AppLayout
      className={`${
        page === 1
          ? "flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-12"
          : "flex flex-col font-lal px-[3.875rem] pt-[9.5rem]"
      }`}
    >
      {page === 1 ? (
        <>
          <div>
            <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
              JOIN A GAME
            </h1>
            <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-[3.25rem]">
              Join your friends to play a quick game
            </p>
            <div className="flex flex-col items-center">
              <h2 className="font-lal text-[1.25rem] leading-[1.959rem] tracking-[-0.4px] mb-4">
                Please enter the game code to continue
              </h2>
              <div className="rounded-[10px] bg-white px-4 py-[1.125rem] flex flex-col items-center">
                <h4 className="font-lal text-[1.375rem] text-center text-black leading-[1.25rem] tracking-[-0.18px] mb-[0.625rem]">
                  GAME CODE:
                </h4>
                <OtpInput value={code} onChange={onChange} />
              </div>
            </div>
          </div>
          <Button
            text="Join Game"
            onClick={() => setPage(2)}
            disabled={code?.length !== 6}
          />
        </>
      ) : (
        <>
          <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px]">
            CREATE AN AVATAR
          </h1>
          <p className="font-lex text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] max-w-[15.313rem] mb-4">
            To join a game, please create an avatar
          </p>
          <div className="mb-[2.125rem] w-full">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
              disabled={!!name}
            />
          </div>
          <Button
            text="Create Avatar"
            className="!text-[1.375rem] !p-2 mb-[2.125rem]"
            disabled={!username}
            onClick={handleSubmit}
          />
          {!name ? (
            <div className="flex">
              <img
                src={info}
                alt="info"
                className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
              />
              <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                This avatar profile is used as a one-time session and will not
                save user scores on the leaderboard
              </p>
            </div>
          ) : null}
        </>
      )}
    </AppLayout>
  );
};

export default JoinGame;
