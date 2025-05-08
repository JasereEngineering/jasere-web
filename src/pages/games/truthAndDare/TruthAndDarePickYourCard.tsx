import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";

import Avatar from "../../../assets/images/avatar7.svg";

import * as ROUTES from "../../../routes";

const TruthAndDarePickYourCard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col items-center justify-center gap-5 w-full mt-6">
        <h1 className="text-[30px] tracking-[-0.25px] uppercase">
          Pick your Card
        </h1>

        <img src={Avatar} alt="avatar" className="w-[92px] h-[92px]" />

        <div className="mt-10 flex items-end justify-center relative w-full max-w-[548px] px-4 h-[300px]">
          <div
            onClick={() => navigate(ROUTES.TRUTH_AND_DARE.CARD)}
            className="flex items-center justify-center bg-[#FBAF00]  bottom-0 left-[70px] rounded-2xl border-[5px] border-[#916A10] cursor-pointer w-[45%] max-w-[274px] h-[276px] absolute origin-bottom transform -rotate-[15.39deg] z-0"
          >
            <p className="text-[#212121] text-[42px] leading-[90%] tracking-[-0.37px] flex items-center justify-center">
              DARE
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.TRUTH_AND_DARE.CARD)}
            className="flex items-center justify-center  rounded-2xl bg-gradient-to-b bottom right-[70px] from-white to-[#F5F2F2] border-[5px] border-[#BABABA] cursor-pointer w-[45%] max-w-[274px] h-[276px] absolute origin-bottom transform rotate-[15.39deg] z-10"
          >
            <p className="text-[#212121] text-[42px] leading-[90%] tracking-[-0.37px] flex items-center justify-center">
              TRUTH
            </p>
          </div>
        </div>

        <button className="mt-14 bg-[#3D3C3CA6] py-5 px-8 rounded-full text-base font-semibold font-inter tracking-[-0.13px] uppercase text-white">
          Leave game
        </button>
      </div>
    </AppLayout>
  );
};

export default TruthAndDarePickYourCard;
