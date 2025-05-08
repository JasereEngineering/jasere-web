import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import RoundedButton from "../../../components/forms/RoundedButton";

import Copy from "../../../assets/images/copy.svg";
import Avatar from "../../../assets/images/avatar7.svg";

import * as ROUTES from "../../../routes";

const TruthAndDareLobby = () => {
  const navigate = useNavigate();

  const players = [
    { id: 1, name: "Dave" },
    { id: 2, name: "Dave" },
    { id: 3, name: "Sarah" },
    { id: 4, name: "John" },
    { id: 5, name: "Emma" },
    { id: 6, name: "Alex" },
  ];

  const chunkSize = 3;
  const playerGroups = [];
  for (let i = 0; i < players.length; i += chunkSize) {
    playerGroups.push(players.slice(i, i + chunkSize));
  }

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col items-center justify-center gap-6 w-full mt-6">
        <h1 className="text-[30px] tracking-[-0.25px]">TRUTH OR DARE!</h1>

        <div className="bg-[#26A69A] text-center rounded-[10px] p-[10px] uppercase text-white text-[22px] tracking-[-0.18px]">
          <p className="leading-[20px]">
            Game code: <br /> <span>12345</span>
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-[28px]">
        <p className="font-inter font-semibold text-base tracking-[-0.4px] mb-6">
          Waiting for other players to join
        </p>
        <p className="text-sm tracking-[-0.4px] font-inter text-center">
          Share link below to invite friends to your game
        </p>

        <div className="w-full flex items-center justify-center mt-2 min-h-[38px]">
          <button className="rounded-l-[10px] bg-[#313131] py-2 px-[14px] h-full">
            <img src={Copy} alt="copy" />
          </button>

          <div className="py-[10px] pl-2 pr-6 bg-[#4A4A4A] rounded-r-[5px] h-full">
            <p className="font-lex tracking-[-0.4px] text-[11px] font-light">
              jasere.com/hosts/scrambled-words/session0a12
            </p>
          </div>
        </div>

        <div className="mt-6 w-full">
          <h1 className="text-base tracking-[-0.34px] text-white text-center">
            Players in the lobby {players.length}/6:
          </h1>

          <div className="flex flex-col items-center mt-4 w-full">
            {playerGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="flex justify-between w-full mb-[10px]"
              >
                {group.map((player) => (
                  <div
                    key={player.id}
                    className="rounded-full py-[5px] w-[calc(33.333%_-_8px)] min-w-0 pl-[6px] pr-[14px] bg-[#FBD2D3] flex items-center gap-[7px]"
                  >
                    <img
                      src={Avatar}
                      alt="avatar"
                      className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                    <p className="text-[#1E1E1E] tracking-[-0.34px] text-sm truncate">
                      {player.name}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <RoundedButton
        text="Let's Play"
        onClick={() => navigate(ROUTES.TRUTH_AND_DARE.SELECT_PLAYER)}
        loading={false}
      />
    </AppLayout>
  );
};

export default TruthAndDareLobby;
