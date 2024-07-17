import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Checkbox from "../components/forms/Checkbox";
import Button from "../components/forms/Button";

import google from "../assets/images/google.svg";
import apple from "../assets/images/apple.svg";
import facebook from "../assets/images/facebook.svg";

import { useAuth } from "../hooks/useAuth";
import { signup } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthContextType, AuthState } from "../types";
import * as ROUTES from "../routes";

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;
  const { login } = useAuth() as AuthContextType;

  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);

  const canSubmit = useMemo(
    () =>
      [username, firstName, lastName, email, password].every((data) => !!data),
    [username, firstName, lastName, email, password]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signup({
        username,
        firstName,
        lastName,
        email,
        password,
        onSuccess: () => navigate(ROUTES.PLAY.PICK_GAME),
      })
    );
  };

  useEffect(() => {
    if (id) login({ id });
  }, [id, login]);

  return (
    <AppLayout className="flex flex-col font-lal px-[3.875rem] pt-[9.5rem]">
      <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px]">
        SIGN UP TO CONTINUE
      </h1>
      <p className="font-lex text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-4">
        Please create an account to host a game
      </p>
      <div className="mb-6 w-full">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="First Name"
          type="text"
          value={firstName}
          onChange={setFirstname}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="Last Name"
          type="text"
          value={lastName}
          onChange={setLastname}
        />
      </div>
      <div className="mb-6 w-full">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          password
        />
      </div>
      <Checkbox
        label="Keep me signed in"
        id="remember-user"
        checked={rememberUser}
        onChange={() => setRememberUser(!rememberUser)}
        className="mb-6"
      />
      <Button
        text="Sign Up"
        className="!text-[1.375rem] !p-2 mb-4"
        loading={loading}
        disabled={!canSubmit}
        onClick={handleSubmit}
      />
      <div className="flex h-[2rem] items-center justify-center mb-2">
        <hr className="border border-white w-[1.5rem]" />
        <span className="font-medium font-lex text-[0.875rem] text-white leading-[1.094rem] px-1">
          or sign up with
        </span>
        <hr className="border border-white w-[1.5rem]" />
      </div>
      <div className="flex gap-x-1 mb-8">
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img src={google} alt="google" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Google
          </span>
        </button>
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img src={apple} alt="apple" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Apple
          </span>
        </button>
        <button className="border border-[#D0D5DD] rounded-[30px] p-2 flex items-center grow">
          <img src={facebook} alt="facebook" />
          <span className="pl-1.5 font-lex text-[0.75rem] text-[#DADADA] leading-[0.938rem]">
            Facebook
          </span>
        </button>
      </div>
      <p className="text-white text-center text-[0.875rem] leading-[1.094rem] font-lex">
        Already have an account?{" "}
        <span
          className="font-bold text-[#E6A101]"
          onClick={() => navigate(ROUTES.AUTH.SIGNIN)}
        >
          Sign in here
        </span>
      </p>
      {/* <div className="grow px-[2.375rem] pb-[4.563rem] md:flex md:justify-center md:items-center">
        <form
          onSubmit={handleSubmit}
          className="md:bg-gradient-to-r from-[#1E1E1E] to-[#18365E] rounded-[36px] md:py-[3.125rem] md:px-[11.5rem] md:max-w-[50.313rem]"
        >
          <h1 className="text-[1.563rem] font-semibold">Create an Account</h1>
          <p className="text-[0.75rem] text-[#8692A6] leading-7 mb-[1.875rem]">
            Fill in your details to create an account
          </p>
          <div className="mb-[0.625rem]">
            <Input
              label="Username"
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={setUsername}
              required
            />
          </div>
          <div className="mb-[0.625rem]">
            <Input
              label="First name"
              placeholder="Enter your first name"
              type="text"
              value={firstName}
              onChange={setFirstname}
              required
            />
          </div>
          <div className="mb-[0.625rem]">
            <Input
              label="Last name"
              placeholder="Enter your last name"
              type="text"
              value={lastName}
              onChange={setLastname}
              required
            />
          </div>
          <div className="mb-[0.625rem]">
            <Input
              label="Email address"
              placeholder="Enter email address"
              type="text"
              value={email}
              onChange={setEmail}
              required
            />
          </div>
          <div className="mb-[0.625rem]">
            <Input
              label="Password"
              placeholder="Enter a password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />
          </div>
          <Checkbox
            label="I agree to terms and conditions"
            id="terms"
            checked={terms}
            onChange={() => setTerms(!terms)}
            className="mb-5 pl-2"
          />
          <Button
            text="Register"
            className="font-medium md:bg-purple"
            loading={loading}
            disabled={!canSubmit}
          />
          <div className="flex h-[1.875rem] items-center">
            <hr className="border border-[#F5F5F5] grow" />
            <span className="font-inter text-[0.75rem] text-[#BABABA] px-2">
              Or
            </span>
            <hr className="border border-[#F5F5F5] grow" />
          </div>
          <Button
            text="Log In"
            className="!bg-[#545559] font-medium mb-4"
            onClick={() => navigate(ROUTES.AUTH.SIGNIN)}
          />
          <div className="flex pl-2">
            <input
              type="checkbox"
              id="newsletter"
              checked={receiveCommunications}
              onChange={() => setReceiveCommunications(!receiveCommunications)}
              className="h-[1.25rem] min-w-[1.25rem]"
            />
            <label
              htmlFor="newsletter"
              className="font-inter text-[0.75rem] text-[#666666] ml-2"
            >
              I would like to receive your newsletter and other promotional
              information
            </label>
          </div>
        </form>
      </div> */}
    </AppLayout>
  );
};

export default SignUp;
