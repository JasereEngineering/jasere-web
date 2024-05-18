import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import AppLayout from "../components/layouts/AppLayout";
import Navbar from "../components/navigation/Navbar";
import Button from "../components/forms/Button";

import Input from "../components/forms/Input";

const EnterGameCode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const gamePin = searchParams.get("code");

  const [code, setCode] = useState(gamePin || "");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const socket = io(`${process.env.REACT_APP_BASE_URL}/game`);

  const handleSubmit = () => {
    socket.emit("join", { game_pin: code, player_name: name });
    setLoading(true);
  };

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <AppLayout className="font-lato flex flex-col">
      <Navbar className="mb-5" />
      <div className="flex flex-col justify-center items-center grow p-[2.5rem]">
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
          onClick={handleSubmit}
          disabled={!name || !code}
          loading={loading}
        />
      </div>
    </AppLayout>
  );
};

export default EnterGameCode;
