import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import avatar from "../assets/images/avatar2.svg";
import crown from "../assets/images/crown.svg";
import trophy from "../assets/images/trophy.svg";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchLeaderboard } from "../store/features/user";
import { avatarMap, playerColours } from "../helpers/misc";

const GlobalLeaderboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { leaderboard, loading } = useSelector<RootState>(
    ({ user }) => user
  ) as UserState;

  useEffect(() => {
    dispatch(fetchLeaderboard({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col font-lal text-white px-4 pt-[7.5rem] pb-[4.875rem]">
      {loading ? <Loader /> : null}
      <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
        LEADERBOARDS
      </h1>
      <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-6">
        See the best players around you
      </p>
      <div className="flex flex-col items-center">
        <img src={trophy} alt="trophy" className="mb-2" />
        <h2 className="text-center text-[1.451rem] leading-[2.274rem] tracking-[-0.45px]">
          {leaderboard?.data[0]?.point.toLocaleString()} PTS
        </h2>
        <p className="text-center text-[0.875rem] leading-[1.371rem] tracking-[-0.45px] mb-[1.875rem]">
          Current Highest Best
        </p>
        {leaderboard?.data.map((r: any, i: number) => (
          <div
            key={i}
            className={`flex justify-between items-center rounded-[33px] p-1.5 pr-3 w-full mb-3 bg-[${
              playerColours[i % playerColours.length]
            }]`}
            style={{
              backgroundColor: playerColours[i % playerColours.length],
            }}
          >
            <div className="flex items-center">
              <img
                src={
                  r.avatar
                    ? avatarMap[r.avatar as keyof typeof avatarMap]
                    : avatar
                }
                alt="avatar"
                className="mr-1.5 h-[2.5rem] w-[2.5rem]"
              />
              <span className="font-lal text-black text-[1.123rem] leading-[1.759rem] tracking-[-0.45px] capitalize">
                {r.player_name}
              </span>
            </div>
            <div className="flex flex-row-reverse items-center gap-x-1">
              <span className="font-lex text-black text-[0.909rem] leading-[1.136rem] tracking-[-0.45px]">
                {r.point}pts
              </span>
              {i === 0 ? <img src={crown} alt="champ" /> : null}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default GlobalLeaderboard;
