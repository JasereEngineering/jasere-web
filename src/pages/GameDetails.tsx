import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import trophy from "../assets/images/trophy.svg";
import share from "../assets/images/share.svg";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchGameDetails } from "../store/features/user";
import { colorMap } from "../helpers/misc";

const GameDetails = () => {
  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { firstName, loading } = useSelector<RootState>(
    ({ user }) => user
  ) as UserState;

  useEffect(() => {
    dispatch(fetchGameDetails(gameSession as string));
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col font-lal absolute text-white pt-[7.5rem]">
      {loading ? <Loader /> : null}
      <div className="px-4">
        <div className="flex justify-between items-center mb-[1.125rem]">
          <h1 className="text-[1.5rem] leading-[2.351rem] tracking-[-0.25px]">
            Games Details
          </h1>
        </div>
        <div className="border border-white rounded-[20px] p-4 pb-5 font-inter font-medium mb-6">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-[1rem] leading-[1.21rem] tracking-[-0.25px] mb-1.5">
                Scrambled Words
              </p>
              <p className="text-pink text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
                Celebrities | Noobie | 5 Rounds
              </p>
            </div>
            <div>
              <p className="text-right text-[#A6A6A6] text-[0.813rem] leading-[0.983rem] tracking-[-0.25px] mb-1">
                02 July, 2024 | 23:21
              </p>
              <p className="text-right text-[#A6A6A6] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
                Time Played: 24:37
              </p>
            </div>
          </div>
          {/* <h3 className="text-[#DADADA] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px] mb-5"> */}
          <h3 className="text-[#DADADA] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px] mb-2.`5">
            Game Session Information
          </h3>
          <div className="flex flex-col gap-y-2.5 mb-6">
            <div className="flex justify-between items-center border-b-[0.4px] border-white border-opacity-[25%] pb-2">
              <div>
                <p className="font-normal text-[0.625rem] leading-[0.756rem] tracking-[-0.25px] mb-3">
                  1st Place
                </p>
                <p className="font-semibold text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
                  Mike
                </p>
              </div>
              <div className="flex gap-x-2 items-center mt-auto">
                <img
                  src={trophy}
                  alt="trophy"
                  className="w-[1.563rem] h-[1.563rem]"
                />
                <p className="font-semibold text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
                  20 PTS
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#30964D] rounded-[7px] py-4 pl-[0.875rem] pr-1.5">
            <div>
              <p className="font-lal font-normal text-[1rem] leading-[1.563rem] tracking-[-0.25px] mb-0.5">
                Mikaelson
              </p>
              <p className="font-normal text-[0.625rem] leading-[0.756rem] tracking-[-0.25px]">
                Winner
              </p>
            </div>
            <div className="flex gap-x-1.5 items-center">
              <img
                src={trophy}
                alt="trophy"
                className="w-[1.875rem] h-[1.875rem]"
              />
              <p className="font-lex font-semibold text-[0.93rem] leading-[1.163rem] tracking-[-0.25px]">
                15 PTS
              </p>
            </div>
          </div>
          {/* <div className="flex justify-between items-center border-b-[0.4px] border-white border-opacity-[25%] pb-2 mb-4">
          <p className="font-normal text-[0.625rem] leading-[0.756rem] tracking-[-0.25px]">
            Number of times played
          </p>
          <p className="font-normal text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
            23
          </p>
        </div>
        <div className="flex justify-between items-center border-b-[0.4px] border-white border-opacity-[25%] pb-2 mb-4">
          <p className="font-normal text-[0.625rem] leading-[0.756rem] tracking-[-0.25px]">
            Max number of players
          </p>
          <p className="font-normal text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
            6
          </p>
        </div>
        <div className="flex justify-between items-center border-b-[0.4px] border-white border-opacity-[25%] pb-2 mb-4">
          <p className="font-normal text-[0.625rem] leading-[0.756rem] tracking-[-0.25px]">
            Max rounds played
          </p>
          <p className="font-normal text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
            23
          </p>
        </div>
        <div className="flex justify-between items-center border-b-[0.4px] border-white border-opacity-[25%] pb-2 mb-4">
          <p className="font-normal text-[0.625rem] leading-[0.756rem] tracking-[-0.25px]">
            Max points claimed
          </p>
          <p className="font-normal text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
            100
          </p>
        </div> */}
        </div>
        <div className="border border-white rounded-[30px] py-1 px-[0.625rem] mt-[0.625rem] flex items-center w-fit mx-auto">
          <img src={share} alt="share" className="mr-2" />
          <span className="font-lal text-[1rem] leading-[1.563rem] tracking-[-0.34px]">
            Share
          </span>
        </div>
      </div>
      <div className="w-full fixed bottom-0 bg-black px-4 pb-[4.188rem] pt-[2rem]">
        <Button text="Replay" onClick={() => {}} />
      </div>
    </AppLayout>
  );
};

export default GameDetails;