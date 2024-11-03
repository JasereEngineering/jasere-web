import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import OtpInput from "../components/forms/OtpInput";
import Input from "../components/forms/Input";

import info from "../assets/images/info-icon.svg";
import check from "../assets/images/avatar-check.svg";

import { avatarMap } from "../helpers/misc";
import { AppDispatch, RootState } from "../store";
import { AuthState, GameState } from "../types";
import { addGuest } from "../store/features/auth";
import { joinGame, setPlayers, validateGame } from "../store/features/game";
import * as ROUTES from "../routes";
import FooterButton from "../components/forms/FooterButton";

const JoinGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const { username: name } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;
  const { loading } = useSelector<RootState>(({ game }) => game) as GameState;

  const gamePin = searchParams.get("code");

  const [code, setCode] = useState(gamePin || "");
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState(name || "");
  const [avatar, setAvatar] = useState("");

  const onChange = (value: string) => setCode(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addGuest(username));
    dispatch(joinGame({ game_pin: code, avatar }));
    dispatch(setPlayers([]));
    navigate(ROUTES.PLAY.START_GAME_GUEST);
  };

  return (
    <AppLayout
      className={`${
        page === 1
          ? "flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-12"
          : "flex flex-col font-lal px-[3.875rem] pt-[9.5rem] pb-[5.75rem]"
      }`}
    >
      {page === 1 ? (
        <>
          <div>
            <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
              JOIN A GAME
            </h1>
            <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-[3.25rem]">
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

          <FooterButton
            text="Join Game"
            onClick={() =>
              dispatch(validateGame({ code, onSuccess: () => setPage(2) }))
            }
            loading={loading}
            disabled={code?.length !== 6}
          />
        </>
      ) : (
        <>
          <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px]">
            SELECT AN AVATAR
          </h1>
          <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] max-w-[15.313rem] mb-6">
            To join a game, please create an avatar
          </p>
          <div className="mb-11 mx-[-3.875rem] flex justify-center">
            <div className="grid grid-cols-4 gap-x-[0.875rem] gap-y-4">
              {Object.keys(avatarMap).map((image) => (
                <div
                  className="relative flex justify-center items-center rounded-full w-[3.875rem] h-[3.875rem]"
                  key={image}
                  onClick={() => setAvatar(image)}
                >
                  <img
                    loading="lazy"
                    className="absolute bottom-0 top-0 left-0 right-0 w-[3.875rem] h-[3.875rem] rounded-full"
                    src={avatarMap[image as keyof typeof avatarMap]}
                    alt="avatar"
                  />
                  {avatar === image ? (
                    <>
                      <div className="absolute bottom-0 top-0 left-0 right-0 w-[3.875rem] h-[3.875rem] rounded-full inset-0 bg-[#FFFFFF] opacity-50"></div>
                      <img
                        loading="lazy"
                        src={check}
                        alt="checked"
                        className="z-10"
                      />
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-[5rem] w-full">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(value: string) => {
                if (value.length > 10) return;
                setUsername(value);
              }}
              // disabled={!!name}
            />
          </div>
          {/* <Button
            text="Let's Play"
            className="!text-[1.375rem] !p-2 mb-[2.125rem]"
            onClick={handleSubmit}
          /> */}

          <div className="flex">
            <img
              loading="lazy"
              src={info}
              alt="info"
              className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
            />
            <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-10">
              This avatar profile is used as a one-time session and will not
              save user scores on the leaderboard
            </p>
          </div>

          <FooterButton
            text="Let's Play"
            onClick={handleSubmit}
            loading={loading}
            disabled={!username || !avatar}
          />
        </>
      )}
    </AppLayout>
  );
};

export default JoinGame;
