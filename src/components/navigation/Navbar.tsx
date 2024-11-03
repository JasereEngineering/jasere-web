import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/full-logo.svg";

import * as ROUTES from "../../routes";

const Navbar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex justify-between items-center pr-5 pt-5 ${
        className ? className : ""
      }`}
    >
      <img
        loading="lazy"
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
  );
};

export default Navbar;
