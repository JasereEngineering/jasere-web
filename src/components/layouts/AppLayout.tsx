import { useNavigate, useLocation } from "react-router-dom";

import help from "../../assets/images/help.svg";
import logoutIcon from "../../assets/images/logout.svg";
import avatar from "../../assets/images/pic.svg";
import video from "../../assets/images/video.svg";
import library from "../../assets/images/library.svg";
import logo from "../../assets/images/full-logo.svg";
import altLogo from "../../assets/images/logo.svg";

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
  const { pathname } = useLocation();

  const { user, logout } = useAuth() as AuthContextType;

  return (
    <div className="flex grow bg-gradient-to-r from-[#1E1E1E] to-[#18365E] text-white relative overflow-hidden">
      <div className="hidden md:flex flex-col justify-between items-center pt-[12rem] pb-[3.375rem] border-r border-[#8692A6] absolute h-screen z-30">
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
      </div>
      <div className="grow md:ml-[5.68rem] overflow-y-auto no-scrollbar">
        <div
          className={`flex md:hidden justify-between items-center pr-5 pt-5 sticky top-0 bg-gradient-to-r from-[#1E1E1E] to-[#18365E] z-50 ${
            navClassName ? navClassName : ""
          }`}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[12.25rem] h-[3.5rem] cursor-pointer"
            onClick={() => navigate(ROUTES.PLAY.PLAY_GAME)}
          />
          <button className="group">
            <div className="grid justify-items-center gap-1">
              <span className="h-[2px] w-6 rounded-full bg-white transition group-hover:rotate-45 group-hover:translate-y-2.5"></span>
              <span className="h-[2px] w-6 rounded-full bg-white group-hover:scale-x-0 transition"></span>
              <span className="h-[2px] w-6 rounded-full bg-white group-hover:-rotate-45 group-hover:-translate-y-2.5"></span>
            </div>
          </button>
        </div>
        <div
          className={`hidden md:flex items-center justify-between pl-[2.375rem] pt-[3.375rem] sticky top-0 bg-gradient-to-r from-[#1E1E1E] to-[#18365E] z-20 ${
            navClassName ? navClassName : ""
          }`}
        >
          <div className="flex grow max-w-[83.25rem] mr-9 border-b border-[#8692A6] font-lato font-black text-[1.75rem]">
            <div
              className={`cursor-pointer pb-2 mr-3 ${
                [ROUTES.PLAY.PLAY_GAME].includes(pathname)
                  ? "border-b border-white"
                  : "font-medium font-raj opacity-75"
              }`}
              onClick={() => navigate(ROUTES.PLAY.PLAY_GAME)}
            >
              <span>HOME</span>
            </div>
            <div
              className={`cursor-pointer pb-2 mr-3 ${
                [ROUTES.PLAY.PICK_GAME].includes(pathname)
                  ? "border-b border-white"
                  : "font-medium font-raj opacity-75"
              }`}
              onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
            >
              <span>MULTIPLAYER</span>
            </div>
            <div
              className={`cursor-pointer pb-2 mr-3 ${
                [ROUTES.DASHBOARD.PROFILE, ROUTES.AUTH.SIGNIN].includes(
                  pathname
                )
                  ? "border-b border-white"
                  : "font-medium font-raj opacity-75"
              }`}
              onClick={() =>
                navigate(user ? ROUTES.DASHBOARD.PROFILE : ROUTES.AUTH.SIGNIN)
              }
            >
              <span>{user ? "PROFILE" : "LOGIN"}</span>
            </div>
          </div>
          <img
            src={altLogo}
            alt="logo"
            className="cursor-pointer"
            onClick={() => navigate(ROUTES.PLAY.PLAY_GAME)}
          />
        </div>
        <div className={`flex grow z-10 h-full ${className ? className : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
