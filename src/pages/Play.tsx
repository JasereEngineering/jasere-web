import AppLayout from "../components/layouts/AppLayout";

import logo from "../assets/images/full-logo.svg";

const Play = () => {
  return (
    <AppLayout className="flex flex-col px-[2.375rem] py-[3.563rem]">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="h-[3.063rem] w-[12.938rem]" />
      </div>
      <div className="flex flex-col grow justify-center items-center">
        <button className="w-full rounded-[6px] p-2 border border-[#555CF6] flex justify-center items-center font-raj text-[2rem] font-semibold mb-9">
          JOIN A GAME
        </button>
        <button className="w-full rounded-[6px] p-2 border border-[#555CF6] flex justify-center items-center font-raj text-[2rem] font-semibold">
          START A GAME
        </button>
      </div>
    </AppLayout>
  );
};

export default Play;
