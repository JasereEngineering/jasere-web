import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import landing from "../assets/images/landing.svg";

import dot from "../assets/images/dot.svg";

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
      <div>
        <Button
          text="Let's Play"
          className="rounded-[78px] mb-6"
          onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
        />
        <div className="flex justify-center items-center gap-x-1.5 font-inter text-[0.875rem] leading-[1.059rem] tracking-[-0.4px]">
          <a href="https://docs.google.com/document/d/1RiJBNK65fP-IhCthjgUAvwUD46biG8536fqD8dtYkcg/edit#heading=h.f8ox4ibnkda0">
            Terms of use
          </a>
          <img src={dot} alt="dot" />
          <a href="https://docs.google.com/document/d/1xL82LoJGk1aGmisBuNKUN8ShtvMxD_GE3VRxg_LCgew/edit#heading=h.1fito8qluymd">
            Privacy policy
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

export default Landing;
