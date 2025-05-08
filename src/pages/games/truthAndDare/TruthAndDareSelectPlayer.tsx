import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";

import Avatar from "../../../assets/images/avatar7.svg";

import * as ROUTES from "../../../routes";

const TruthAndDareSelectPlayer = () => {
  const navigate = useNavigate();

  const players = [
    { id: 1, name: "Dave" },
    { id: 2, name: "Dave" },
    { id: 3, name: "Sarah" },
    { id: 4, name: "John" },
    { id: 5, name: "Emma" },
    { id: 6, name: "Alex" },
    { id: 7, name: "John" },
    { id: 8, name: "Emma" },
    { id: 9, name: "Alex" },
    { id: 10, name: "John" },
    { id: 11, name: "Emma" },
    { id: 12, name: "Alex" },
  ];

  const chunkSize = 3;
  const playerGroups = [];
  for (let i = 0; i < players.length; i += chunkSize) {
    playerGroups.push(players.slice(i, i + chunkSize));
  }

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex items-center justify-center text-center flex-col mt-4">
        <h1 className="text-[30px] tracking-[-0.25px]">TRUTH OR DARE</h1>

        <p className="font-inter text-sm tracking-[-0.4px]">Select a player</p>

        <div className="flex flex-col items-center mt-8 w-full px-[28px]">
          {playerGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex justify-between w-full mb-[18px]"
            >
              {group.map((player) => (
                <div
                  key={player.id}
                  onClick={() => navigate(ROUTES.TRUTH_AND_DARE.PICK_YOUR_CARD)}
                  className="rounded-full py-[5px] cursor-pointer w-[calc(33.333%_-_12px)] min-w-0 pl-[6px] pr-[14px] bg-[#FBD2D3] flex items-center gap-[7px]"
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
    </AppLayout>
  );
};

export default TruthAndDareSelectPlayer;
