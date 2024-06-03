import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

import { AppDispatch } from "../store";
import { addGuest } from "../store/features/auth";
import { joinGame } from "../store/features/game";
import * as ROUTES from "../routes";

const JoinGame = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const gamePin = searchParams.get("code");

  const [code, setCode] = useState(gamePin || "");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const socket = io(`${process.env.REACT_APP_BASE_URL}/game`);
    socket.emit("join", { game_pin: code, player_name: name });
    socket.on("join", handleJoin);
    socket.on("disconnect", () => showError("unable to join game"));
  };

  const showError = (message: string) => {
    setTimeout(() => {
      toast.error(message);
      setLoading(false);
    }, 2000);
  };

  const handleJoin = (response: any) => {
    if (response.statusCode !== "00") return showError(response.statusMessage);

    const game = response.game.replaceAll(" ", "-").toLowerCase();
    dispatch(addGuest(name));
    dispatch(joinGame({ ...response, game, game_pin: code }));

    navigate(ROUTES.PLAY.BEGIN_GAME_FOR(game, response.game_session_id));
  };

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-5">
      <div className="flex flex-col justify-center items-center grow p-[2.5rem]">
        <form
          onSubmit={handleSubmit}
          className="md:bg-gradient-to-r from-[#1E1E1E] to-[#18365E] rounded-[36px] md:py-[5.125rem] md:px-[11.5rem] w-full md:max-w-[50.313rem]"
        >
          <Input
            type="text"
            value={name}
            placeholder="ENTER NAME"
            onChange={setName}
            className="text-center mb-4"
          />
          <Input
            type="text"
            value={code}
            placeholder="ENTER GAME PIN"
            onChange={setCode}
            className="text-center mb-[1.625rem]"
          />
          {/* <div className="flex h-[4.5rem] w-[12rem] items-center">
          <hr className="border border-white grow" />
          <span className="font-raj font-medium text-[0.938rem] px-2">OR</span>
          <hr className="border border-white grow" />
        </div>
        <h2 className="font-lato font-black text-[2rem] text-center mb-[1.625rem]">
          SCAN QR CODE
        </h2> */}
          <Button
            text="LET'S PLAY"
            disabled={!name || !code}
            loading={loading}
          />
        </form>
      </div>
    </AppLayout>
  );
};

export default JoinGame;
