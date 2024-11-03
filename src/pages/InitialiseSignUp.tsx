import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import Select from "../components/forms/Select";

import google from "../assets/images/google.svg";
import apple from "../assets/images/apple.svg";
import facebook from "../assets/images/facebook.svg";
import info from "../assets/images/info-icon.svg";

import { isValidEmail } from "../helpers/misc";
import { fetchGenders } from "../store/features/game";
import { beginSignup } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const InitialiseSignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector<RootState>(({ auth }) => auth) as AuthState;
  const { genders } = useSelector<RootState>(({ game }) => game) as GameState;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [gender, setGender] = useState(genders?.[0]?.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) return toast.error("Please enter a valid email");

    dispatch(
      beginSignup({
        username,
        email,
        gender,
        onSuccess: () => setEmailSent(true),
      }),
    );
  };

  useEffect(() => {
    dispatch(fetchGenders());
  }, [dispatch]);

  return (
    <AppLayout className="flex flex-col font-lal px-[3.875rem] pt-[9.5rem] pb-[4.25rem]">
      {emailSent ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50 p-3">
          <div className="bg-black rounded-[27px] px-9 pt-[3.875rem] pb-[3.375rem] flex flex-col items-center w-full">
            <h2 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px] mb-1.5">
              VERIFY YOUR EMAIL
            </h2>
            <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-[3.75rem]">
              Please tap on the link sent to your email address to verify your
              account
            </p>
            <div className="flex items-center mb-5">
              <img
                loading="lazy"
                src={info}
                alt="info"
                className="mr-2 h-[1.125rem] w-[1.125rem]"
              />
              <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                Verification link will be valid for 30 minutes
              </p>
            </div>
            <Button
              text="Close"
              className="text-[1.375rem] leading-[2.154rem] p-1.5"
              onClick={() => setEmailSent(false)}
            />
          </div>
        </div>
      ) : null}
      <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px]">
        CREATE AN ACCOUNT
      </h1>
      <div className="flex justify-center">
        <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-7 max-w-[15.313rem]">
          Please enter the following details to create your account
        </p>
      </div>
      <div className="mb-4 w-full">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="mb-4 w-full">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className="mb-[3.625rem] w-full">
        <Select
          label="Gender"
          value={gender}
          onChange={setGender}
          options={genders?.map((g) => ({ value: g.id, label: g.name })) || []}
          className="!text-[0.875rem] !leading-[1.094rem]"
        />
      </div>
      <Button
        text="Proceed"
        className="!text-[1.375rem] !p-2 mb-4"
        loading={loading}
        disabled={!username || !email}
        onClick={handleSubmit}
      />
      <div className="flex h-[2rem] items-center justify-center mb-2">
        <hr className="border border-white w-[1.5rem]" />
        <span className="font-medium font-inter text-[0.875rem] text-white leading-[1.094rem] px-1">
          or sign up with
        </span>
        <hr className="border border-white w-[1.5rem]" />
      </div>
      <div className="flex gap-x-1 mb-8">
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img loading="lazy" src={google} alt="google" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Google
          </span>
        </button>
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img loading="lazy" src={apple} alt="apple" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Apple
          </span>
        </button>
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img loading="lazy" src={facebook} alt="facebook" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Facebook
          </span>
        </button>
      </div>
      <p className="text-white text-center text-[0.875rem] leading-[1.094rem] font-inter">
        Already have an account?{" "}
        <span
          className="font-bold text-[#E6A101]"
          onClick={() => navigate(ROUTES.AUTH.SIGNIN)}
        >
          Sign in here
        </span>
      </p>
    </AppLayout>
  );
};

export default InitialiseSignUp;
