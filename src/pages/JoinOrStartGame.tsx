import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

const JoinOrStartGame = () => {
  return (
    <AppLayout className="flex flex-col">
      <div className="flex justify-center items-center grow p-4">
        <div className="bg-gradient-to-r md:bg-none from-[#DEDEDE] to-violet p-0.5 rounded-[20px] w-full">
          <div className="rounded-[18px] bg-gradient-to-r md:bg-none from-[#1E1E1E] to-[#18365E] px-[1.375rem] py-[2.5rem] md:flex md:flex-col md:items-center">
            <Button
              text="JOIN A GAME"
              className="p-2 border border-[#555CF6] font-lato text-[1.75rem] font-bold mb-6 !bg-inherit md:max-w-[29.75rem] md:rounded-[27px] md:font-raj md:font-semibold md:text-[3.5rem] md:p-0 md:mb-[3.75rem]"
            />
            <Button
              text="START A GAME"
              className="p-2 border border-[#555CF6] font-lato text-[1.75rem] font-bold !bg-inherit md:max-w-[29.75rem] md:rounded-[27px] md:font-raj md:font-semibold md:text-[3.5rem] md:p-0"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default JoinOrStartGame;
