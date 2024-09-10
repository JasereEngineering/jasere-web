import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";

import avatar from "../assets/images/avatar2.svg";
import premium from "../assets/images/premium.svg";
import edit from "../assets/images/edit.svg";
import subscription from "../assets/images/subscription.svg";

import { RootState, AppDispatch } from "../store";
import { UserState, GameState } from "../types";
import { fetchProfile } from "../store/features/user";
import { fetchGenders } from "../store/features/game";
import { maskEmail } from "../helpers/misc";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, email, gamesCreated, gamesPlayed, badges } =
    useSelector<RootState>(({ user }) => user) as UserState;
  const { genders } = useSelector<RootState>(({ game }) => game) as GameState;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(genders?.[0]?.id);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchGenders());
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-[4.875rem]">
      {loading ? <Loader /> : null}
      <div>
        <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
          PROFILE
        </h1>
        <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-4">
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
                {gamesPlayed}
              </span>
              <span className="font-inter text-center text-[0.625rem] leading-[0.781rem]">
                Games played
              </span>
            </div>
            <div className="flex flex-col items-center px-4 border-l border-r border-[#4F4F4F66]">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                {gamesCreated}
              </span>
              <span className="font-inter text-center text-[0.625rem] leading-[0.781rem]">
                Games created
              </span>
            </div>
            <div className="flex flex-col items-center grow">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                {badges}
              </span>
              <span className="font-inter text-center text-[0.625rem] leading-[0.781rem]">
                Badges unlocked
              </span>
            </div>
          </div>
          <div className="mb-3 w-full">
            <Input
              label="Email Address"
              type="email"
              value={`${maskEmail(email)} (unchanged)`}
              onChange={() => {}}
              disabled
              className="!font-semibold !text-[#504F4F] !leading-[0.938rem]"
            />
          </div>
          <div className="flex gap-x-[1.375rem] mb-3">
            <div className="w-full">
              <Input
                label="First Name"
                type="text"
                value={firstName}
                onChange={setFirstName}
                className="!font-semibold !text-[#504F4F] !leading-[0.938rem]"
              />
            </div>
            <div className="w-full">
              <Input
                label="Last Name"
                type="text"
                value={lastName}
                onChange={setLastName}
                className="!font-semibold !text-[#504F4F] !leading-[0.938rem]"
              />
            </div>
          </div>
          <div className="mb-3 w-full">
            <Select
              label="Gender"
              value={gender}
              onChange={setGender}
              options={
                genders?.map((g) => ({ value: g.id, label: g.name })) || []
              }
              className="!font-semibold !text-[0.75rem] !text-[#504F4F] !leading-[0.938rem]"
            />
          </div>
          <div className="mb-[8.25rem] w-full">
            <Input
              label="Password"
              type="text"
              value="**************** (unchanged)"
              onChange={() => {}}
              disabled
              className="!font-semibold !text-[#504F4F] !leading-[0.938rem]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mx-[-1rem] pb-8">
        <button className="text-[1rem] text- text-center leading-[1.25rem] tracking-[3px]">
          Update Account
        </button>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
