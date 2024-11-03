import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

import { useAuth } from "../hooks/useAuth";
import { completeSignup } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthContextType, AuthState } from "../types";

const CompleteSignUp = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;
  const { login, user } = useAuth() as AuthContextType;

  const verification_id = searchParams.get("verification_id")!;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      completeSignup({
        password,
        verification_id,
      }),
    );
  };

  useEffect(() => {
    if (id && !user) {
      login({ id });
    }
  }, [id, login, user]);

  return (
    <AppLayout className="flex flex-col justify-between font-lal px-[3.875rem] pt-[9.5rem] pb-[4.25rem]">
      <div className="flex flex-col">
        <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px] mx-[-1rem]">
          SECURE YOUR ACCOUNT
        </h1>
        <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-7 max-w-[15.313rem]">
          Please create a password to secure your account
        </p>
        <div className="mb-4 w-full">
          <Input
            label="Enter Password"
            type="password"
            value={password}
            onChange={setPassword}
            password
            hideForgotPassword
          />
        </div>
        <div className="mb-4 w-full">
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            password
            hideForgotPassword
          />
        </div>
      </div>
      <Button
        text="Create Account"
        className="!text-[1.375rem] !p-2 mb-4"
        loading={loading}
        disabled={!password || !confirmPassword || password !== confirmPassword}
        onClick={handleSubmit}
      />
    </AppLayout>
  );
};

export default CompleteSignUp;
