import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import GameCard from "../components/misc/GameCard";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import party from "../assets/images/party.jpg";
import left from "../assets/images/scroll-left-focus.svg";
import right from "../assets/images/scroll-right-focus.svg";
import image from "../assets/images/full-logo.svg";
import avatar from "../assets/images/pic.svg";

import { AppDispatch, RootState } from "../store";
import { fetchGames } from "../store/features/game";
import { GameState } from "../types";
import * as ROUTES from "../routes";

const Landing = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, games } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [num, setNum] = useState(0);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNum((prevNumber) => {
        return prevNumber === 2 ? 0 : prevNumber + 1;
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-5 md:mb-10">
      {loading ? <Loader /> : null}
      <div className="flex flex-col grow px-7 pb-[2.625rem] lg:hidden">
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
                text="JOIN A GAME"
                className="font-lato p-[0.875rem] text-[1.375rem] !bg-violet"
                onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
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
              <img src={right} alt="scroll right" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              image={image}
              pending={!game.isActive}
              onClick={() => {
                if (!game.isActive) return;
                navigate(ROUTES.PLAY.PICK_GAME);
              }}
            />
          ))}
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-4 gap-x-[5rem] px-10 md:px-[5.375rem] pb-10">
        <div className="col-span-3">
          <div className="bg-gradient-to-r from-[#E1E1E1] to-purple p-0.5 rounded-[20px] mb-[3.5rem] aspect-video">
            <div className="rounded-[18px] bg-[#D78001] p-5 flex h-full">
              <div className="flex flex-col justify-center pl-11 pr-6">
                <h1 className="font-bold lg:text-[2.063rem] xl:text-[4.25rem] xl:leading-[4.438rem] mb-[0.625rem]">
                  The Best Party Games On Mobile!
                </h1>
                <p className="mb-8">Over 100 games created and counting</p>
                <Button
                  text="JOIN A GAME"
                  className="w-[13.75rem] h-[3.313rem] rounded-[27px] !bg-violet font-black text-[1.5rem]"
                  onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
                />
              </div>
              <div className="bg-gradient-to-r from-[#E1E1E1] to-purple p-0.5 rounded-[20px] h-full aspect-square max-w-[50%] flex mb-6 shadow-sm">
                <div className="rounded-[18px] flex grow bg-[#2C2F48] overflow-hidden">
                  <img
                    src={party}
                    alt="friends"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-[0.875rem]">
            <h4 className="font-medium text-[1.5rem]">
              Your favourite house party games
            </h4>
            <div className="flex items-center">
              <button
                // onClick={() => scrollByWidth(-88)}
                className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[2.313rem] w-[2.313rem] rounded-[4px] text-[#E1E1E1] mr-[0.625rem]"
              >
                <img
                  src={left}
                  alt="scroll left"
                  className="h-[1.25rem] w-[1.25rem]"
                />
              </button>
              <button
                // onClick={() => scrollByWidth(88)}
                className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[2.313rem] w-[2.313rem] rounded-[4px] text-[#E1E1E1]"
              >
                <img
                  src={right}
                  alt="scroll right"
                  className="h-[1.25rem] w-[1.25rem]"
                />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-5">
            {games.map((game) => (
              <GameCard
                key={game.id}
                name={game.name}
                image={image}
                pending={!game.isActive}
                onClick={() => {
                  if (!game.isActive) return;
                  navigate(ROUTES.PLAY.PICK_GAME);
                }}
              />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="mb-4 text-[0.938rem] font-bold">Testimonials</h2>
          <div className="cursor-pointer rounded-[10px] p-6 hover:bg-purple shadow-2xl mb-5">
            <p className="overflow-x-auto no-scrollbar text-nowrap text-clip text-[0.938rem]">
              This games are easy to play and interact with. - Sisi Eko
            </p>
          </div>
          <div className="cursor-pointer rounded-[10px] p-6 hover:bg-purple shadow-2xl mb-5">
            <p className="overflow-x-auto no-scrollbar text-nowrap text-clip text-[0.938rem]">
              This games are easy to play and interact with. - Sisi Eko
            </p>
          </div>
          <div className="cursor-pointer rounded-[10px] p-6 hover:bg-purple shadow-2xl mb-5">
            <p className="overflow-x-auto no-scrollbar text-nowrap text-clip text-[0.938rem]">
              This games are easy to play and interact with. - Sisi Eko
            </p>
          </div>
          <div className="cursor-pointer rounded-[10px] p-6 hover:bg-purple shadow-2xl mb-6">
            <p className="overflow-x-auto no-scrollbar text-nowrap text-clip text-[0.938rem]">
              This games are easy to play and interact with. - Sisi Eko
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <div className="flex justify-between items-center mb-9 mt-3 pr-4">
                <h4 className="text-[0.938rem]">Stats</h4>
                <div className="flex items-center">
                  <button
                    // onClick={() => scrollByWidth(-88)}
                    className="flex justify-center items-center mr-2"
                  >
                    <img
                      src={left}
                      alt="scroll left"
                      className="h-[0.563rem] w-[0.563rem]"
                    />
                  </button>
                  <button
                    // onClick={() => scrollByWidth(88)}
                    className="flex justify-center items-center"
                  >
                    <img
                      src={right}
                      alt="scroll right"
                      className="h-[0.563rem] w-[0.563rem]"
                    />
                  </button>
                </div>
              </div>
              <div className="rounded-[10px] p-5 shadow-2xl w-[9rem] mb-7">
                <p className="font-black text-[1.75rem]">1000+</p>
                <p className="text-[0.75rem]">Registered Players</p>
              </div>
              <div className="rounded-[10px] p-5 shadow-2xl w-[9rem] mb-7">
                <p className="font-black text-[1.75rem]">252+</p>
                <p className="text-[0.75rem]">Daily Players</p>
              </div>
              <div className="rounded-[10px] p-5 shadow-2xl w-[9rem] mb-7">
                <p className="font-black text-[1.75rem]">401++</p>
                <p className="text-[0.75rem]">Games Shared</p>
              </div>
            </div>
            <div>
              <p className="text-[0.938rem] opacity-50 py-2 mb-2">
                1012 members
              </p>
              <div className="p-2 rounded-[5px] bg-[#18365E] mb-2 flex items-center rounded-[5px]">
                <img
                  src={avatar}
                  alt="avatar"
                  className="rounded-full h-[2.75rem] w-[2.75rem] mr-2"
                />
                <div>
                  <p className="text-[0.938rem]">Anne Couture</p>
                  <p className="text-[0.813rem] opacity-50">5 mins ago</p>
                </div>
              </div>
              <div className="p-2 rounded-[5px] bg-[#18365E] mb-2 flex items-center rounded-[5px]">
                <img
                  src={avatar}
                  alt="avatar"
                  className="rounded-full h-[2.75rem] w-[2.75rem] mr-2"
                />
                <div>
                  <p className="text-[0.938rem]">Anne Couture</p>
                  <p className="text-[0.813rem] opacity-50">5 mins ago</p>
                </div>
              </div>
              <div className="p-2 rounded-[5px] bg-[#18365E] mb-2 flex items-center rounded-[5px]">
                <img
                  src={avatar}
                  alt="avatar"
                  className="rounded-full h-[2.75rem] w-[2.75rem] mr-2"
                />
                <div>
                  <p className="text-[0.938rem]">Anne Couture</p>
                  <p className="text-[0.813rem] opacity-50">5 mins ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Landing;
