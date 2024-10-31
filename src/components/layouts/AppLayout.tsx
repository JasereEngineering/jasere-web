import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/images/new-logo.svg";
import create from "../../assets/images/create-game.svg";
import games from "../../assets/images/my-games.svg";
import profile from "../../assets/images/profile.svg";
import helpIcon from "../../assets/images/help-icon.svg";
import logoutIcon from "../../assets/images/logout-icon.svg";
import avatar from "../../assets/images/avatar2.png";
import guest from "../../assets/images/guest.svg";
import premium from "../../assets/images/premium.svg";
import leaderboards from "../../assets/images/leaderboards.svg";

import { useAuth } from "../../hooks/useAuth";
import { AuthContextType, AuthState } from "../../types";
import { RootState } from "../../store";
import * as ROUTES from "../../routes";

import black_kite from "../../assets/images/black-kite-asset.svg";
// import triangle from "../../assets/images/triangle.svg";
// import triangle_green from "../../assets/images/triangle-green.svg";
import yellow_kite from "../../assets/images/yellow-kite.svg";
// import yellow_bar from "../../assets/images/yellow-bar.svg";
import parallel from "../../assets/images/parallel.svg";
import scattered_green from "../../assets/images/scattered-green.svg";


const AppLayout = ({
  children,
  className,
  navClassName,
  help,
  landing
}: {
  children: any;
  className?: string;
  navClassName?: string;
  help?: boolean;
  landing?: boolean;
}) => {
  const navigate = useNavigate();

  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const { user, logout } = useAuth() as AuthContextType;

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white relative overflow-y-auto no-scrollbar h-full"> 

    {
      landing && (

          <div className="absolute inset-0 text-white flex font-bold grid grid-cols-2 gap-4">
              <div className="relative">
                <img src={black_kite} alt="black_kite" className="w-auto h-32 rounded-md" />
                </div>
              <div className="relative">
                <img src={black_kite} alt="black_kite" className="w-auto h-32 rounded-md justify-self-end" />
              </div>
              <img src={black_kite} alt="black_kite" className="w-auto h-32 rounded-md" />
              
              <div className="relative">
                <img src={yellow_kite} alt="black_kite" className="w-auto h-32 rounded-md justify-self-end" />
                </div>


              <div className="relative">
              <img src={black_kite} alt="black_kite" className="w-auto h-32 rounded-md" />

                <img src={parallel} alt="black_kite" className="w-auto h-32 rounded-md" />
                </div>
              <div className="relative">
                <img src={scattered_green} alt="black_kite" className="w-auto h-32 rounded-md justify-self-end" />
              </div>
    {/* <img src="https://via.placeholder.com/150" alt="Image 2" class="w-full h-auto rounded-md">
    <img src="https://via.placeholder.com/150" alt="Image 3" class="w-full h-auto rounded-md">
    <img src="https://via.placeholder.com/150" alt="Image 4" class="w-full h-auto rounded-md">
    <img src="https://via.placeholder.com/150" alt="Image 5" class="w-full h-auto rounded-md">
    <img src="https://via.placeholder.com/150" alt="Image 6" class="w-full h-auto rounded-md"></img> */}
          </div>





      )
    }

    {/* <div className="grid grid-cols-2 justify-between w-full h-full">

<div className="col-start-1">
  <img src={black_kite} alt="Left" className="h-32 w-auto mt-[5rem]" />
</div>
<div className="col-start-2">
  <img src={triangle} alt="Left" className="h-20 w-auto mt-[4rem] justify-self-end" />
</div>
<div className="col-start-1">
  <img src={triangle_green} alt="Left" className="h-32 w-auto" />
</div>
<div className="col-start-2"></div>
<div className="col-start-1">
  <img src={yellow_bar} alt="Left" className="h-32 w-auto mt-[5rem]" />
</div>
<div className="col-start-2">
  <img src={yellow_kite} alt="Left" className="h-32 w-auto justify-self-end mb-[7rem]" />
</div>

<div className="col-start-1">
  <img src={parallel} alt="Left" className="h-32 w-auto mt-[5rem]" />
</div>
<div className="col-start-2">
  <img src={scattered_green} alt="Left" className="h-32 w-auto justify-self-end mt-[6rem]" />
</div>



</div> */}


      <div
        className={`fixed top-0 left-0 bottom-0 bg-black w-[18.5rem] z-50 px-[2-25rem] pt-[6.875rem] transform transition-transform duration-300 ease-in-out ${
          open ? "" : "-translate-x-full"
        }`}
      >
        <img
          loading="lazy"
          src={logo}
          alt="logo"
          className="w-[14.313rem] h-[4.063rem] mb-[1.875rem]"
          onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
        />
        <div className="pl-[1.85rem] max-w-[15rem] flex flex-col">
          <div className="flex">
            {user ? (
              <img
                loading="lazy"
                src={avatar}
                alt="avatar"
                className="w-[2.875rem] h-[2.875rem] rounded-full mr-3"
              />
            ) : (
              <img
                loading="lazy"
                src={guest}
                alt="avatar"
                className="w-[2.875rem] h-[2.875rem] rounded-full mr-3"
              />
            )}
            <div
              className={`flex flex-col justify-${user ? "between" : "center"}`}
            >
              <h5 className="text-[1.25rem] text-white leading-[1.959rem] font-lal capitalize">
                {user ? username : "Guest"}
              </h5>
              {user ? (
                <div className="rounded-[20px] flex items-center py-[0.125rem] px-[0.406rem] bg-gold max-w-fit">
                  <img
                    loading="lazy"
                    src={premium}
                    alt="premium"
                    className="mr-1"
                  />
                  <span className="text-black text-[0.493rem] leading-[0.616rem] font-semibold font-lex">
                    Premium
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="h-[1px] w-[5.938rem] my-6 bg-[#DADADA]"></div>
          </div>
          <div
            className="flex items-center rounded-[15px] bg-white p-[0.625rem] mb-6"
            onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
          >
            <img
              loading="lazy"
              src={create}
              alt="create a game"
              className="mr-5"
            />
            <p className="font-lal text-black text-[1.25rem] leading-[1.959rem]">
              Create a Game
            </p>
          </div>
          {user ? (
            <>
              <div
                className="flex items-center mb-5"
                onClick={() => navigate(ROUTES.DASHBOARD.PROFILE)}
              >
                <img
                  loading="lazy"
                  src={profile}
                  alt="profile"
                  className="mr-5"
                />
                <p className="font-lal text-white text-[1.25rem] leading-[1.959rem]">
                  Profile
                </p>
              </div>
              <div
                className="flex items-center mb-5"
                onClick={() => navigate(ROUTES.DASHBOARD.GAMES)}
              >
                <img
                  loading="lazy"
                  src={games}
                  alt="my games"
                  className="mr-5"
                />
                <p className="font-lal text-white text-[1.25rem] leading-[1.959rem]">
                  My Games
                </p>
              </div>
              <div
                className="flex items-center"
                onClick={() => navigate(ROUTES.DASHBOARD.LEADERBOARD)}
              >
                <img
                  loading="lazy"
                  src={leaderboards}
                  alt="leaderboards"
                  className="mr-5"
                />
                <p className="font-lal text-white text-[1.25rem] leading-[1.959rem]">
                  Leaderboards
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex items-center mb-5"
                onClick={() => navigate(ROUTES.AUTH.SIGNIN)}
              >
                <img
                  loading="lazy"
                  src={profile}
                  alt="sign in"
                  className="mr-5"
                />
                <p className="font-lal text-white text-[1.25rem] leading-[1.959rem]">
                  Sign In
                </p>
              </div>
              <div
                className="flex items-center"
                onClick={() => navigate(ROUTES.AUTH.BEGIN_SIGNUP)}
              >
                <img
                  loading="lazy"
                  src={profile}
                  alt="register"
                  className="mr-5"
                />
                <p className="font-lal text-white text-[1.25rem] leading-[1.959rem]">
                  Register
                </p>
              </div>
            </>
          )}
          {user ? (
            <div
              className="flex items-center mt-[9.375rem]"
              onClick={() => logout()}
            >
              <img
                loading="lazy"
                src={logoutIcon}
                alt="log out"
                className="mr-5"
              />
              <p className="font-lal text-[#F34348] text-[1.25rem] leading-[1.959rem]">
                Sign out
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={`flex justify-between items-center px-4 pt-[2.375rem] pb-1 fixed top-0 bg-black z-40 border-b border-[#343434] w-full ${
          navClassName ? navClassName : ""
        }`}
      >
        <button className={`group ${ navClassName ? 'mb-10':'' }`} onClick={() => setOpen(!open)}>
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
        <img
          loading="lazy"
          src={logo}
          alt="logo"
          className={`cursor-pointer ${ navClassName ? 'w-[13.313rem] h-[2.063rem] mb-8':'w-[14.313rem] h-[4.063rem] ' }`}
          onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
        />
        <button className={`min-w-[1.5rem] min-h-[1.5rem] ${ navClassName ? 'mb-10':'' }`}>
          <img
            loading="lazy"
            src={helpIcon}
            alt="help"
            className={`${help ? "block" : "hidden"}`}
            onClick={() => navigate(ROUTES.PLAY.PLAY_GAME)}
          />
          <img
            loading="lazy"
            src={avatar}
            alt="avatar"
            className={`h-[1.875rem] w-[1.875rem] rounded-full ${
              user ? "block" : "hidden"
            }`}
          />
        </button>
      </div>


      {/* <div
        className={`hidden md:flex items-center justify-between pl-[3.438rem] pt-[2.625rem] pr-[3.875rem] sticky top-0 bg-black z-20 font-lal font-bold overflow-x-auto no-scrollbar ${
          navClassName ? navClassName : ""
        }`}
      >
        <img loading="lazy"
          src={logo}
          className="cursor-pointer w-[20.563rem] h-[6rem]"
          alt="logo"
          onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
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
      </div> */}
      <div
        className={`flex grow z-10 h-full w-full ${className ? className : ""}`}
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
      {/* </div> */}
    </div>
  );
};

export default AppLayout;
