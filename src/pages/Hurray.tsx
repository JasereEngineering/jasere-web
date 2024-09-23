import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import hurray from "../assets/images/hurray.svg";

import * as ROUTES from "../routes";

const Hurray = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="flex flex-col justify-center items-center p-[2.375rem]">
      <div className="md:bg-gradient-to-r from-[#1E1E1E] to-[#18365E] rounded-[36px] md:py-[3.75rem] md:px-[6.563rem] md:max-w-[50.313rem] flex flex-col items-center">
        <img loading="lazy" src={hurray} alt="hurray icon" className="mb-[0.625rem] md:hidden" />
        <h1 className="font-pop font-semibold text-[1.25rem] md:hidden">Hurray!!!</h1>
        <p className="font-pop font-light text-[1.25rem] mb-[1.875rem] md:mb-[1.125rem] md:font-semibold md:text-[1.875rem]">
          You are now official
          <span className="ml-1 hidden md:inline">👋</span>
        </p>
        <Button
          text="Get back to gaming"
          className="font-medium md:w-[26.625rem] md:h-[4rem] md:bg-purple"
          onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
        />
      </div>
    </AppLayout>
  );
};

export default Hurray;
