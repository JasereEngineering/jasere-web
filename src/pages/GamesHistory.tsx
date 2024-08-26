import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import filter from "../assets/images/filter.svg";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchGames } from "../store/features/user";
import { colorMap } from "../helpers/misc";
import * as ROUTES from "../routes";

const GamesHistory = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { firstName, loading } = useSelector<RootState>(
    ({ user }) => user
  ) as UserState;

  useEffect(() => {
    dispatch(fetchGames({ page: 1, limit: 100 }));
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col font-lal text-white px-4 pt-[7.5rem] pb-[4.875rem]">
      {loading ? <Loader /> : null}
      <div className="flex justify-between items-center mb-[1.125rem]">
        <h1 className="text-[1.5rem] leading-[2.351rem] tracking-[-0.25px]">
          Games Played
        </h1>
        <img src={filter} alt="filter" />
      </div>
      <div className="border border-white rounded-[20px] p-4 pl-4 font-inter font-medium">
        <div className="flex justify-between mb-[1.375rem]">
          <div>
            <p className="text-[1rem] leading-[1.21rem] tracking-[-0.25px] mb-1.5">
              Scrambled Words
            </p>
            <p className="text-pink text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
              Celebrities | Noobie | 5 Rounds
            </p>
          </div>
          <p className="text-right text-[#A6A6A6] text-[0.813rem] leading-[0.983rem] tracking-[-0.25px]">
            02 July, 2024 | 23:21
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#DADADA] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
            Time Played: 24:37
          </p>
          <p className="text-right text-[#DADADA] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
            No. of players: 15
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default GamesHistory;
