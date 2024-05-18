import AppLayout from "../components/layouts/AppLayout";
import Navbar from "../components/navigation/Navbar";
import Button from "../components/forms/Button";

const JoinOrStartGame = () => {
  return (
    <AppLayout className="flex flex-col">
      <Navbar className="mb-5" />
      <div className="flex justify-center items-center grow p-4">
        <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] mb-7 w-full">
          <div className="rounded-[18px] bg-gradient-to-r from-[#1E1E1E] to-[#18365E] px-[1.375rem] py-[2.5rem]">
            <Button
              text="JOIN A GAME"
              className="p-2 border border-[#555CF6] font-lato text-[1.75rem] font-bold mb-6 !bg-inherit"
            />
            <Button
              text="START A GAME"
              className="p-2 border border-[#555CF6] font-lato text-[1.75rem] font-bold !bg-inherit"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default JoinOrStartGame;
