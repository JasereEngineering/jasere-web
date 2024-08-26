import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";
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
  const { loading } = useSelector<RootState>(
    ({ user }) => user
  ) as UserState;

  useEffect(() => {
    dispatch(fetchProfile());
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
                90
              </span>
              <span className="font-inter text-center text-[0.625rem] leading-[0.781rem]">
                Games played
              </span>
            </div>
            <div className="flex flex-col items-center px-4 border-l border-r border-[#4F4F4F66]">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                14
              </span>
              <span className="font-inter text-center text-[0.625rem] leading-[0.781rem]">
                Games created
              </span>
            </div>
            <div className="flex flex-col items-center grow">
              <span className="font-lal text-center text-[2.25rem] leading-[3.5rem]">
                9
              </span>
              <span className="font-inter text-center text-[0.625rem] leading-[0.781rem]">
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
  );
};

export default Dashboard;
