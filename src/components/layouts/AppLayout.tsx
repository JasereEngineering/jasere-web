import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/full-logo.svg";
import games from "../../assets/images/side-games.svg";
import join from "../../assets/images/side-join.svg";
import logoutIcon from "../../assets/images/side-logout.svg";
import newGame from "../../assets/images/side-new.svg";
import profile from "../../assets/images/side-profile.svg";
import setings from "../../assets/images/side-settings.svg";
import caret from "../../assets/images/side-right.svg";

import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types";
import * as ROUTES from "../../routes";

const AppLayout = ({
  children,
  className,
  navClassName,
}: {
  children: any;
  className?: string;
  navClassName?: string;
}) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth() as AuthContextType;

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#1E1E1E] to-[#18365E] text-white relative overflow-y-auto no-scrollbar h-full">
      {/* <div className="hidden md:flex flex-col justify-between items-center pt-[12rem] pb-[3.375rem] border-r border-[#8692A6] absolute h-screen z-30">
        <div className="flex flex-col grow items-center">
          <div className="px-6 mb-4">
            <img
              src={avatar}
              alt="avatar"
              className="h-[3rem] w-[2.5rem] cursor-pointer"
            />
          </div>
          <div className="border-l-[3px] border-orange px-6 mb-4">
            <img
              src={avatar}
              alt="avatar"
              className="h-[3rem] w-[2.5rem] cursor-pointer"
            />
          </div>
          <div className="px-6 mb-6">
            <img
              src={avatar}
              alt="avatar"
              className="h-[3rem] w-[2.5rem] cursor-pointer"
            />
          </div>
          <img src={video} alt="watch" className="mb-6 cursor-pointer" />
          <img src={library} alt="library cursor-pointer" />
        </div>
        <div className="flex flex-col items-center">
          <img src={help} alt="help" className="mb-7 cursor-pointer" />
          {user ? (
            <img
              src={logoutIcon}
              alt="logout"
              className="cursor-pointer"
              onClick={() => logout()}
            />
          ) : null}
        </div>
      </div> */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 bg-orange w-[13.75rem] z-50 px-[1.313rem] pt-[5.813rem] font-lato transform transition-transform duration-300 ease-in-out ${
          open ? "" : "-translate-x-full"
        }`}
      >
        <div
          className="pb-3 mb-3 border-b border-[#FFB457] flex justify-between items-center"
          onClick={() => navigate(ROUTES.DASHBOARD.PROFILE)}
        >
          <div className="flex items-center">
            <img
              src={setings}
              alt="leaderboard"
              className="mr-3 w-[1.875rem] h-[1.875rem]"
            />
            <span className="font-bold text-[0.875rem]">Leaderboard</span>
          </div>
          <img src={caret} alt="leaderboard" />
        </div>
        <div
          className="pb-3 mb-3 border-b border-[#FFB457] flex justify-between items-center"
          onClick={() => navigate(ROUTES.DASHBOARD.PROFILE)}
        >
          <div className="flex items-center">
            <img
              src={profile}
              alt="profile"
              className="mr-3 w-[1.875rem] h-[1.875rem]"
            />
            <span className="font-bold text-[0.875rem]">My Profile</span>
          </div>
          <img src={caret} alt="profile" />
        </div>
        <div
          className="pb-3 mb-3 border-b border-[#FFB457] flex justify-between items-center"
          onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
        >
          <div className="flex items-center">
            <img
              src={join}
              alt="join game"
              className="mr-3 w-[1.875rem] h-[1.875rem]"
            />
            <span className="font-bold text-[0.875rem]">Join New Game</span>
          </div>
          <img src={caret} alt="join game" />
        </div>
        <div
          className="pb-3 mb-3 border-b border-[#FFB457] flex justify-between items-center"
          onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
        >
          <div className="flex items-center">
            <img
              src={newGame}
              alt="start game"
              className="mr-3 w-[1.875rem] h-[1.875rem]"
            />
            <span className="font-bold text-[0.875rem]">Start New Game</span>
          </div>
          <img src={caret} alt="start game" />
        </div>
        <div
          className="pb-3 mb-3 border-b border-[#FFB457] flex justify-between items-center"
          onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
        >
          <div className="flex items-center">
            <img
              src={games}
              alt="my games"
              className="mr-3 w-[1.875rem] h-[1.875rem]"
            />
            <span className="font-bold text-[0.875rem]">My Games</span>
          </div>
          <img src={caret} alt="my games" />
        </div>
        <div
          className="pb-3 mb-3 border-b border-[#FFB457] flex justify-between items-center"
          onClick={() => {
            if (user) {
              logout();
            } else {
              navigate(ROUTES.AUTH.SIGNIN);
            }
          }}
        >
          <div className="flex items-center">
            <img
              src={logoutIcon}
              alt="logout"
              className="mr-3 w-[1.875rem] h-[1.875rem]"
            />
            <span className="font-bold text-[0.875rem]">
              {user ? "Log Out" : "Log In"}
            </span>
          </div>
          <img src={caret} alt="logout" />
        </div>
      </div>
      {/* <div className="grow md:ml-[5.68rem] overflow-y-auto no-scrollbar"> */}
      <div
        className={`flex md:hidden justify-between items-center pr-5 pt-5 sticky top-0 bg-gradient-to-r from-[#1E1E1E] to-[#18365E] z-40 ${
          navClassName ? navClassName : ""
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className="w-[12.25rem] h-[3.5rem] cursor-pointer"
          onClick={() => navigate(ROUTES.PLAY.PLAY_GAME)}
        />
        <button className="group" onClick={() => setOpen(!open)}>
          <div className="grid justify-items-center gap-1">
            <span
              className={`h-[2px] w-6 rounded-full bg-white transition ${
                open ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-6 rounded-full bg-white  transition ${
                open ? "scale-x-0" : ""
              }`}
            ></span>
            <span
              className={`h-[2px] w-6 rounded-full bg-white transition ${
                open ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>
      <div
        className={`hidden md:flex items-center justify-between pl-[3.438rem] pt-[2.625rem] pr-[3.875rem] sticky top-0 bg-gradient-to-r from-[#1E1E1E] to-[#18365E] z-20 font-lato font-bold overflow-x-auto no-scrollbar ${
          navClassName ? navClassName : ""
        }`}
      >
        <img
          src={logo}
          className="cursor-pointer w-[20.563rem] h-[6rem]"
          alt="logo"
          onClick={() => navigate(ROUTES.PLAY.PLAY_GAME)}
        />
        <div className="flex items-center gap-x-[0.875rem]">
          <button
            className="p-[0.688rem] rounded-[6px] text-[0.938rem] bg-violet w-[9.563rem]"
            onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
          >
            JOIN A GAME
          </button>
          <button
            className="p-[0.688rem] rounded-[6px] text-[0.938rem] border border-violet w-[9.563rem]"
            onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
          >
            START A GAME
          </button>
          <button
            className="p-[0.688rem] rounded-[6px] text-[0.938rem] border border-violet w-[9.563rem]"
            onClick={() => {
              if (user) {
                logout();
              } else {
                navigate(ROUTES.AUTH.SIGNIN);
              }
            }}
          >
            {user ? "LOGOUT" : "LOGIN"}
          </button>
        </div>
      </div>
      <div
        className={`flex grow z-10 h-full ${className ? className : ""}`}
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
      {/* </div> */}
    </div>
  );
};

export default AppLayout;
