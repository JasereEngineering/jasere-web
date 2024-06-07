import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import hurray from "../assets/images/hurray.svg";
import left from "../assets/images/scroll-left-focus.svg";
import right from "../assets/images/scroll-right-focus.svg";
import PlayerCard from "../components/misc/PlayerCard";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchProfile } from "../store/features/user";
import * as ROUTES from "../routes";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { firstName, loading } = useSelector<RootState>(({ user }) => user) as UserState;

  const [category, setCategory] = useState<"played" | "created">("played");

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const scrollByWidth = (width: number) => {
    if (scrollableDivRef.current) {
      const { current } = scrollableDivRef;
      current.scrollLeft += width;
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col" navClassName="mb-12">
      <div className="grow px-7 pb-[3.125rem]">
      {loading ? <Loader /> : null}
        <div className="flex mb-[3.25rem]">
          <img
            src={hurray}
            alt="profile"
            className="border-4 border-white rounded-full h-[5.125rem] w-[5.125rem] h-[6rem] w-[6rem] mr-[0.875rem]"
          />
          <div className="pt-[0.313rem]">
            <h1 className="font-pop font-semibold text-[1.563rem]">
              Hello {firstName} 👋
            </h1>
            <p className="font-lato font-semibold text-yellow text-[0.875rem] mb-3">
              Creator Pro
            </p>
            <p className="font-pop text-[1rem] text-[#E1E1E1] max-w-[11.875rem]">
              We are happy to have you back
            </p>
          </div>
        </div>
        <div className="px-[1.375rem] flex justify-between items-center mb-[4.5rem]">
          <div className="font-pop" onClick={() => setCategory("played")}>
            <p
              className={`font-bold text-[0.938rem] ${
                category === "created" ? "font-lato" : ""
              }`}
            >
              Games Played
            </p>
            <p
              className={`font-semibold text-[1.563rem] text-center ${
                category === "created" ? "text-[1.188rem]" : ""
              }`}
            >
              23
            </p>
          </div>
          <div className="font-pop" onClick={() => setCategory("created")}>
            <p
              className={`font-bold text-[0.938rem] ${
                category === "played" ? "font-lato" : ""
              }`}
            >
              Games Created
            </p>
            <p
              className={`font-semibold text-[1.563rem] text-center ${
                category === "played" ? "text-[1.188rem]" : ""
              }`}
            >
              203
            </p>
          </div>
        </div>
        <div className="mb-[8.75rem]">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-pop font-bold text-[0.938rem]">
              Active Players
            </h5>
            <div className="flex items-center">
              <button
                onClick={() => scrollByWidth(-88)}
                className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[1rem] w-[1rem] rounded-[4px] text-[#E1E1E1] mr-1"
              >
                <img src={left} alt="scroll left" />
              </button>
              <button
                onClick={() => scrollByWidth(88)}
                className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[1rem] w-[1rem] rounded-[4px] text-[#E1E1E1]"
              >
                <img src={right} alt="scroll left" />
              </button>
            </div>
          </div>
          <div
            ref={scrollableDivRef}
            className="flex flex-nowrap overflow-x-auto no-scrollbar mr-[-1.75rem]"
          >
            <div className="bg-white flex flex-col pt-4 px-5 font-pop font-medium text-[0.813rem] rounded-[6px] w-[5.188rem] h-[8.063rem] mr-4">
              <div className="rounded-full flex justify-center items-center min-h-[2.688rem] min-w-[2.688rem] bg-[#EF4637] mb-[0.563rem]">
                +
              </div>
              <p className="text-[#1A1A1A] text-center leading-[110.3%]">
                Join Players or Group
              </p>
            </div>
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Ahmed" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
            <PlayerCard name="Tobins Greener" image={hurray} />
          </div>
        </div>
        <div className="mt-auto px-[0.625rem]">
          <Button
            text="JOIN A GAME"
            className="p-[0.875rem] border border-[#555CF6] font-lato text-[1.188rem] font-bold mb-3 !bg-inherit"
            onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
          />
          <Button
            text="CREATE NEW GAME"
            className="p-[0.875rem] border border-[#555CF6] font-lato text-[1.188rem] font-bold !bg-inherit"
            onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
