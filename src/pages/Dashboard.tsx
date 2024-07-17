import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";
import PlayerCard from "../components/misc/PlayerCard";
import Input from "../components/forms/Input";

import avatar from "../assets/images/avatar2.svg";
import premium from "../assets/images/premium.svg";
import edit from "../assets/images/edit.svg";
import subscription from "../assets/images/subscription.svg";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchProfile } from "../store/features/user";
import * as ROUTES from "../routes";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { firstName, loading } = useSelector<RootState>(
    ({ user }) => user
  ) as UserState;

  const [category, setCategory] = useState<"played" | "created">("played");

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const scrollByWidth = (width: number) => {
    if (scrollableDivRef.current) {
      const { current } = scrollableDivRef;
      current.scrollLeft += width;
    }
  };

  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, [dispatch]);

  return (
    <AppLayout className="flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-[4.875rem]">
      <div>
        <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
          PROFILE
        </h1>
        <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-4">
          Edit your profile
        </p>
        <div className="flex flex-col items-center px-4">
          <div className="relative mb-3">
            <img
              src={avatar}
              alt="avatar"
              className="w-[5.875rem] h-[5.875rem] rounded-full"
            />
            <img
              src={edit}
              alt="edit"
              className="absolute bottom-[0.375rem] right-[-0.375rem]"
            />
          </div>
          <div className="rounded-[20px] flex items-center py-[0.125rem] px-[0.406rem] bg-gold max-w-fit mb-[0.625rem]">
            <img src={premium} alt="premium" className="mr-1" />
            <span className="text-black text-[0.575rem] leading-[0.719rem] tracking-[-0.31px] font-semibold font-lex">
              Premium
            </span>
          </div>
          <div className="flex items-center rounded-[6px] border border-white px-[0.625rem] py-1.5 mb-8">
            <img src={subscription} alt="subscription" className="mr-2" />
            <span className="text-[1rem] leading-[1.563rem] tracking-[-0.34px] font-lal">
              Manage Subscription
            </span>
          </div>
          <div className="bg-gradient-to-r from-[#AC7903] via-[#DD9A01] to-[#AB7801] w-full rounded-[25px] py-[1.75rem] px-4 gap-x-3 flex items-center justify-between mb-4">
            <div className="flex flex-col items-center grow">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                90
              </span>
              <span className="font-lex text-center text-[0.625rem] leading-[0.781rem]">
                Games played
              </span>
            </div>
            <div className="flex flex-col items-center px-4 border-l border-r border-[#4F4F4F66]">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                14
              </span>
              <span className="font-lex text-center text-[0.625rem] leading-[0.781rem]">
                Games created
              </span>
            </div>
            <div className="flex flex-col items-center grow">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                9
              </span>
              <span className="font-lex text-center text-[0.625rem] leading-[0.781rem]">
                Badges unlocked
              </span>
            </div>
          </div>
          <div className="mb-6 w-full">
            <Input
              label="Email Address"
              type="email"
              value="Victo*****e@gmail.com (unchanged)"
              onChange={() => {}}
              disabled
              className="!font-semibold !text-[0.75rem] !text-[#504F4F] !leading-[0.938rem]"
            />
          </div>
          <div className="mb-6 w-full">
            <Input
              label="Password"
              type="text"
              value="**************** (unchanged)"
              onChange={() => {}}
              disabled
              className="!font-semibold !text-[0.75rem] !text-[#504F4F] !leading-[0.938rem]"
            />
          </div>
        </div>
      </div>
      <button className="text-[1rem] text-[#F34348] text-center leading-[1.25rem] tracking-[3px]">
        Delete Account
      </button>
    </AppLayout>
    // <AppLayout className="flex flex-col" navClassName="mb-12">
    //   <div className="grow px-7 pb-[3.125rem]">
    //   {loading ? <Loader /> : null}
    //     <div className="flex mb-[3.25rem]">
    //       <img
    //         src={hurray}
    //         alt="profile"
    //         className="border-4 border-white rounded-full h-[5.125rem] w-[5.125rem] h-[6rem] w-[6rem] mr-[0.875rem]"
    //       />
    //       <div className="pt-[0.313rem]">
    //         <h1 className="font-pop font-semibold text-[1.563rem]">
    //           Hello {firstName} 👋
    //         </h1>
    //         <p className="font-lato font-semibold text-yellow text-[0.875rem] mb-3">
    //           Creator Pro
    //         </p>
    //         <p className="font-pop text-[1rem] text-[#E1E1E1] max-w-[11.875rem]">
    //           We are happy to have you back
    //         </p>
    //       </div>
    //     </div>
    //     <div className="px-[1.375rem] flex justify-between items-center mb-[4.5rem]">
    //       <div className="font-pop" onClick={() => setCategory("played")}>
    //         <p
    //           className={`font-bold text-[0.938rem] ${
    //             category === "created" ? "font-lato" : ""
    //           }`}
    //         >
    //           Games Played
    //         </p>
    //         <p
    //           className={`font-semibold text-[1.563rem] text-center ${
    //             category === "created" ? "text-[1.188rem]" : ""
    //           }`}
    //         >
    //           23
    //         </p>
    //       </div>
    //       <div className="font-pop" onClick={() => setCategory("created")}>
    //         <p
    //           className={`font-bold text-[0.938rem] ${
    //             category === "played" ? "font-lato" : ""
    //           }`}
    //         >
    //           Games Created
    //         </p>
    //         <p
    //           className={`font-semibold text-[1.563rem] text-center ${
    //             category === "played" ? "text-[1.188rem]" : ""
    //           }`}
    //         >
    //           203
    //         </p>
    //       </div>
    //     </div>
    //     <div className="mb-[8.75rem]">
    //       <div className="flex justify-between items-center mb-4">
    //         <h5 className="font-pop font-bold text-[0.938rem]">
    //           Active Players
    //         </h5>
    //         <div className="flex items-center">
    //           <button
    //             onClick={() => scrollByWidth(-88)}
    //             className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[1rem] w-[1rem] rounded-[4px] text-[#E1E1E1] mr-1"
    //           >
    //             <img src={left} alt="scroll left" />
    //           </button>
    //           <button
    //             onClick={() => scrollByWidth(88)}
    //             className="flex justify-center items-center bg-[#174685] border-[0.5px] border-[#797EFE] h-[1rem] w-[1rem] rounded-[4px] text-[#E1E1E1]"
    //           >
    //             <img src={right} alt="scroll left" />
    //           </button>
    //         </div>
    //       </div>
    //       <div
    //         ref={scrollableDivRef}
    //         className="flex flex-nowrap overflow-x-auto no-scrollbar mr-[-1.75rem]"
    //       >
    //         <div className="bg-white flex flex-col pt-4 px-5 font-pop font-medium text-[0.813rem] rounded-[6px] w-[5.188rem] h-[8.063rem] mr-4">
    //           <div className="rounded-full flex justify-center items-center min-h-[2.688rem] min-w-[2.688rem] bg-[#EF4637] mb-[0.563rem]">
    //             +
    //           </div>
    //           <p className="text-[#1A1A1A] text-center leading-[110.3%]">
    //             Join Players or Group
    //           </p>
    //         </div>
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Ahmed" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //         <PlayerCard name="Tobins Greener" image={hurray} />
    //       </div>
    //     </div>
    //     <div className="mt-auto px-[0.625rem]">
    //       <Button
    //         text="JOIN A GAME"
    //         className="p-[0.875rem] border border-[#555CF6] font-lato text-[1.188rem] font-bold mb-3 !bg-inherit"
    //         onClick={() => navigate(ROUTES.PLAY.JOIN_GAME)}
    //       />
    //       <Button
    //         text="CREATE NEW GAME"
    //         className="p-[0.875rem] border border-[#555CF6] font-lato text-[1.188rem] font-bold !bg-inherit"
    //         onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
    //       />
    //     </div>
    //   </div>
    // </AppLayout>
  );
};

export default Dashboard;
