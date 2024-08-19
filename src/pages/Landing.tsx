import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import landing from "../assets/images/landing.svg";

import * as ROUTES from "../routes";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="pt-[10rem] px-[1.875rem] pb-[5.25rem] flex flex-col justify-between">
      <div className="flex flex-col items-center grow">
        <img src={landing} alt="landing" className="mb-10" />
        <h1 className="text-center text-white text-[1.875rem] leading-[3rem] tracking-[-0.25px] font-lal max-w-[15.313rem] mb-1.5">
          PLAY THE BEST PARTY GAMES ON MOBILE
        </h1>
        <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-9">
          Party games for group of friends
        </p>
      </div>
      <Button
        text="Let's Play"
        className="rounded-[78px]"
        onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
      />
    </AppLayout>
  );
};

export default Landing;
