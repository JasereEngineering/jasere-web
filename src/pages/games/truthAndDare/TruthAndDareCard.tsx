import AppLayout from "../../../components/layouts/AppLayout";

import DareBackground from "../../../assets/images/dare-bg.svg";
import TruthBackground from "../../../assets/images/truth-bg.svg";
import Avatar from "../../../assets/images/avatar7.svg";

const TruthAndDareCard = () => {
  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <h1 className="text-[30px] tracking-[-0.25px]">YOUR CARD</h1>

        <div className="mt-6 px-6">
          <div
            className="w-full h-[478px] rounded-[30px] bg-cover bg-center flex flex-col items-center justify-start p-[28px_32px]"
            style={{ backgroundImage: `url(${DareBackground})` }}
          >
            <div className="bg-white w-[111px] h-[111px] rounded-full gap-[3px] pt-[18px] px-[27px] flex flex-col items-center justify-center">
              <img src={Avatar} alt="avatar" className="w-[57px] h-[57px]" />
              <p className="text-[#1E1E1E] text-lg tracking-[-0.41px] text-center">
                Ola
              </p>
            </div>

            <h1 className="mt-10 text-[#212121] text-[44px] tracking-[-0.38px] leading-[90%] text-center">
              YOU HAVE BEEN DARED!
            </h1>

            <p className="text-[22px] text-[#1E1E1E] font-man text-center mt-5">
              Gift everyone in the room a $100 bill
            </p>
          </div>
        </div>

        <div className="mt-6 px-6">
          <div
            className="w-full h-[478px] rounded-[30px] bg-cover bg-center flex flex-col items-center justify-start p-[28px_32px]"
            style={{ backgroundImage: `url(${TruthBackground})` }}
          >
            <div className="bg-black w-[111px] h-[111px] rounded-full gap-[3px] pt-[18px] px-[27px] flex flex-col items-center justify-center">
              <img src={Avatar} alt="avatar" className="w-[57px] h-[57px]" />
              <p className="text-white text-lg tracking-[-0.41px] text-center">
                Ola
              </p>
            </div>

            <h1 className="mt-10 text-[#212121] text-[44px] tracking-[-0.38px] leading-[90%] text-center">
              YOU MUST TELL THE TRUTH!{" "}
            </h1>

            <p className="text-[22px] text-[#1E1E1E] font-man text-center mt-5">
              When was the last time you stole?{" "}
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TruthAndDareCard;
