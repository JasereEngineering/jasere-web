import AppLayout from "../../../components/layouts/AppLayout";

import avatar from "../../../assets/images/avatar2.png";

function HowToPlay() {
  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <h1 className="text-[30px] tracking-[-0.25px]">TAP TAP!</h1>

        <img
          loading="lazy"
          src={avatar}
          alt="avatar"
          className="w-[92px] h-[92px] mt-7 rounded-full object-cover"
        />

        <h1 className="uppercase mt-4 font-manjari text-white font-bold text-2xl">
          How to Play
        </h1>

        <p className="text-lg text-white mt-5 text-center font-manjari max-w-[277px] mx-auto">
          Identify the colors NOT the words, Tap them quickly following the
          <span className="font-bold uppercase"> correct sequence</span>
        </p>

        <p className="text-base mt-[260px] text-white font-manjari">
          Please wait, your game is starting
        </p>

        <button className="uppercase px-8 my-8 py-[22px] font-bold bg-[#3D3C3CA6] font-manjari rounded-3xl">
          Leave Game
        </button>
      </div>
    </AppLayout>
  );
}

export default HowToPlay;
