import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";

import host from "../assets/images/host-game.svg";
import join from "../assets/images/join-game.svg";
import create from "../assets/images/create-a-game.svg";

import * as ROUTES from "../routes";

const Play = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="flex flex-col px-4 pt-[9rem]">
      <div
        className="bg-[#8538E8] rounded-[15px] flex pl-[1.188rem] py-[0.938rem] relative mb-10"
        onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
      >
        <div className="flex flex-col">
          <h3 className="font-lal text-[1.875rem] text-white leading-[2.979rem] tracking-[-0.25px] mb-1">
            HOST A GAME
          </h3>
          <p className="font-lex text-[0.75rem] text-white leading-[0.938rem] tracking-[-0.4px] max-w-[9.438rem] mb-3">
            Create a game server for your friends to join & play!
          </p>
          <div className="bg-white text-[#8538E8] text-[0.493rem] leading-[0.616rem] tracking-[-0.26px] rounded-[20px] px-[0.719rem] py-[0.411rem] font-lex font-semibold max-w-fit">
            Sign-in required
          </div>
        </div>
        <img
          src={host}
          alt="host a game"
          className="absolute bottom-0 right-[-0.625rem]"
        />
      </div>
      <div
        className="bg-[#E6A101] rounded-[15px] flex pl-[1.188rem] py-[0.938rem] relative mb-10"
        onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
      >
        <div className="flex flex-col">
          <h3 className="font-lal text-[1.875rem] text-white leading-[2.979rem] tracking-[-0.25px] mb-1">
            JOIN GAME
          </h3>
          <p className="font-lex text-[0.75rem] text-white leading-[0.938rem] tracking-[-0.4px] max-w-[6.375rem] mb-3">
            Join a game using a link or QR Code
          </p>
          <div className="bg-white text-[#E6A101] text-[0.493rem] leading-[0.616rem] tracking-[-0.26px] rounded-[20px] px-[0.719rem] py-[0.411rem] font-lex font-semibold max-w-fit">
            No sign-in required
          </div>
        </div>
        <img
          src={join}
          alt="join game"
          className="absolute bottom-[-0.0625rem] right-[-0.0625rem] scale-x-[-1]"
        />
      </div>
      <div className="bg-[#F34348] rounded-[15px] flex pl-[1.188rem] py-[0.938rem] relative mb-10 opacity-50">
        <div className="flex flex-col">
          <h3 className="font-lal text-[1.875rem] text-white leading-[2.979rem] tracking-[-0.25px] mb-1">
            CREATE A GAME
          </h3>
          <p className="font-lex text-[0.75rem] text-white leading-[0.938rem] tracking-[-0.4px] max-w-[6.375rem] mb-3">
            Add a new game with custom rules
          </p>
          <div className="bg-white text-[#F34348] text-[0.493rem] leading-[0.616rem] tracking-[-0.26px] rounded-[20px] px-[0.719rem] py-[0.411rem] font-lex font-semibold max-w-fit">
            Premium required
          </div>
        </div>
        <img
          src={create}
          alt="create game"
          className="absolute bottom-0 right-[-0.0625rem]"
        />
      </div>
    </AppLayout>
  );
};

export default Play;
