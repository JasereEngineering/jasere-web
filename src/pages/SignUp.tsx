import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Checkbox from "../components/forms/Checkbox";
import Button from "../components/forms/Button";

import google from "../assets/images/google.svg";
import apple from "../assets/images/apple.svg";
import facebook from "../assets/images/facebook.svg";

import { useAuth } from "../hooks/useAuth";
import { signup } from "../store/features/auth";
import { createGame } from "../store/features/game";
import { AppDispatch, RootState } from "../store";
import { AuthContextType, AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;
  const { game, level } = useSelector<RootState>(
    ({ game }) => game,
  ) as GameState;
  const { login, user } = useAuth() as AuthContextType;

  const gameName = searchParams.get("game_name");

  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [createdGame, setCreatedGame] = useState(false);

  const canSubmit = useMemo(
    () =>
      [username, firstName, lastName, email, password].every((data) => !!data),
    [username, firstName, lastName, email, password],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signup({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    );
  };

  useEffect(() => {
    if (id && !loggedIn) {
      login({ id });
      setLoggedIn(true);
    }
  }, [id, login, loggedIn]);

  useEffect(() => {
    if (user && !createdGame) {
      if ([gameName, game, level].every((i) => i)) {
        dispatch(
          createGame({
            name: gameName!,
            onSuccess: () => navigate(ROUTES.PLAY.START_GAME),
          }),
        );
      } else {
        navigate(ROUTES.PLAY.GET_STARTED);
      }
      setCreatedGame(true);
    }
  }, [user, dispatch, gameName, navigate, createdGame, game, level]);

  return (
    <AppLayout className="flex flex-col font-lal px-[3.875rem] pt-[9.5rem] pb-[4.25rem]">
      <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px]">
        SIGN UP TO CONTINUE
      </h1>
      <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-4">
        Please create an account to host a game
      </p>
      <div className="mb-6 w-full">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="First Name"
          type="text"
          value={firstName}
          onChange={setFirstname}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="Last Name"
          type="text"
          value={lastName}
          onChange={setLastname}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          password
        />
      </div>
      <Checkbox
        label="Keep me signed in"
        id="remember-user"
        checked={rememberUser}
        onChange={() => setRememberUser(!rememberUser)}
        className="mb-6"
      />
      <Button
        text="Sign Up"
        className="!text-[1.375rem] !p-2 mb-4 bg-white text-black"
        loading={loading}
        disabled={!canSubmit}
        onClick={handleSubmit}
      />
      <div className="flex h-[2rem] items-center justify-center mb-2">
        <hr className="border border-white w-[1.5rem]" />
        <span className="font-medium font-inter text-[0.875rem] text-white leading-[1.094rem] px-1">
          or sign up with
        </span>
        <hr className="border border-white w-[1.5rem]" />
      </div>
      <div className="flex gap-x-1 mb-8">
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img loading="lazy" src={google} alt="google" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Google
          </span>
        </button>
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img loading="lazy" src={apple} alt="apple" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Apple
          </span>
        </button>
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img loading="lazy" src={facebook} alt="facebook" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Facebook
          </span>
        </button>
      </div>
      <p className="text-white text-center text-[0.875rem] leading-[1.094rem] font-inter">
        Already have an account?{" "}
        <span
          className="font-bold text-[#E6A101]"
          onClick={() =>
            navigate(
              `${ROUTES.AUTH.SIGNIN}${gameName ? `?game_name=${gameName}` : ""}`,
            )
          }
        >
          Sign in here
        </span>
      </p>
    </AppLayout>
  );
};

export default SignUp;
