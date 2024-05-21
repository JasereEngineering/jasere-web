import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import GameCard from "../components/misc/GameCard";
import Button from "../components/forms/Button";

import party from "../assets/images/party.jpg";
import left from "../assets/images/scroll-left-focus.svg";
import right from "../assets/images/scroll-right-focus.svg";
import image from "../assets/images/full-logo.svg";

import * as ROUTES from "../routes";

const Landing = () => {
  const navigate = useNavigate();

  const [num, setNum] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNum((prevNumber) => {
        return prevNumber === 2 ? 0 : prevNumber + 1;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-5">
      <div className="flex flex-col grow px-7 pb-[2.625rem]">
        <div className="bg-gradient-to-r from-[#E1E1E1] to-purple p-0.5 rounded-[6px] mb-7">
          <div className="rounded-[4px] bg-[#D78001] p-4">
            <h1 className="font-bold text-[2.063rem] text-center leading-[2.375rem] mb-[0.625rem]">
              The Best Party Games On Mobile!
            </h1>
            <div className="bg-gradient-to-r from-[#E1E1E1] to-purple p-0.5 rounded-[20px] w-full h-[15.25rem] flex mb-6 shadow-sm">
              <div className="rounded-[18px] flex grow bg-[#2C2F48] overflow-hidden">
                <img
                  src={party}
                  alt="friends"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mb-2">
              {/* <div className="rounded-full bg-white w-[0.464rem] h-[0.464rem]"></div>
              <div className="rounded-full bg-white w-[0.348rem] h-[0.348rem] opacity-50 "></div>
              <div className="rounded-full bg-white w-[0.348rem] h-[0.348rem] opacity-50"></div> */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full bg-white ${
                    i === num
                      ? "w-[0.464rem] h-[0.464rem]"
                      : "w-[0.348rem] h-[0.348rem] opacity-50"
                  } ${i === 1 ? "mx-[0.313rem]" : ""}`}
                ></div>
              ))}
            </div>
            <div className="px-8">
              <Button
                text="START A GAME"
                className="font-lato p-[0.875rem] text-[1.375rem] !bg-violet"
                onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-[0.875rem]">
          <h4 className="font-medium text-[1rem]">
            Your favourite house party games
          </h4>
          <div className="flex items-center">
            <button
              // onClick={() => scrollByWidth(-88)}
              className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[1rem] w-[1rem] rounded-[4px] text-[#E1E1E1] mr-1"
            >
              <img src={left} alt="scroll left" />
            </button>
            <button
              // onClick={() => scrollByWidth(88)}
              className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[1rem] w-[1rem] rounded-[4px] text-[#E1E1E1]"
            >
              <img src={right} alt="scroll left" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8">
          <GameCard
            name="JOIN GAME"
            image={image}
            onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
          />
          <GameCard
            name="JOIN GAME"
            image={image}
            onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Landing;
