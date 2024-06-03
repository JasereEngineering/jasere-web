import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Checkbox from "../components/forms/Checkbox";
import Button from "../components/forms/Button";

// import googleIcon from "../assets/images/google.svg";

import { useAuth } from "../hooks/useAuth";
import { signin } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthContextType, AuthState } from "../types";
import * as ROUTES from "../routes";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;
  const { login } = useAuth() as AuthContextType;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [receiveCommunications, setReceiveCommunications] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signin({
        username,
        password,
        onSuccess: () => navigate(ROUTES.DASHBOARD.PROFILE),
      })
    );
  };

  useEffect(() => {
    if (id) login({ id });
  }, [id, login]);

  return (
    <AppLayout className="flex flex-col font-pop" navClassName="mb-16">
      <div className="grow px-[2.375rem] pb-[4.563rem] md:flex md:justify-center md:items-center">
        <form
          onSubmit={handleSubmit}
          className="md:bg-gradient-to-r from-[#1E1E1E] to-[#18365E] rounded-[36px] md:py-[3.125rem] md:px-[11.5rem] md:max-w-[50.313rem]"
        >
          <h1 className="text-[1.563rem] font-semibold">Welcome Back 👋</h1>
          <p className="text-[0.75rem] text-[#E1E1E1] text-[#8692A6] leading-7 mb-[1.875rem]">
            We are happy to have you back
          </p>
          <div className="mb-[0.625rem]">
            <Input
              label="Username"
              placeholder="Enter username"
              type="text"
              value={username}
              onChange={setUsername}
              required
            />
          </div>
          <div className="mb-[0.625rem]">
            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />
          </div>
          <Checkbox
            label="Remember me"
            id="remember"
            checked={rememberUser}
            onChange={() => setRememberUser(!rememberUser)}
            className="mb-5 pl-2"
          />
          <Button
            text="Login"
            className="font-medium md:bg-purple"
            loading={loading}
            disabled={!username || !password}
          />
          <div className="flex h-[1.875rem] items-center">
            <hr className="border border-[#F5F5F5] grow" />
            <span className="font-inter text-[0.75rem] text-[#BABABA] px-2">
              Or
            </span>
            <hr className="border border-[#F5F5F5] grow" />
          </div>
          <Button
            text="Sign Up"
            className="!bg-[#545559] font-medium mb-4"
            onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
          />
          <div className="flex pl-2 mb-[2.688rem]">
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
          <a
            href="/forgot-password"
            className="text-center text-purple text-[1rem] font-inter font-semibold"
          >
            Forgot your password?
          </a>
        </form>
      </div>
    </AppLayout>
  );
};

export default Login;
