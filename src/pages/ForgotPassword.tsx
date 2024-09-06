import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

import { forgotPassword } from "../store/features/auth";
import { AppDispatch, RootState } from "../store";
import { AuthState } from "../types";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      forgotPassword({
        email,
        onSuccess: () =>
          toast.success("A reset email has been sent to your email"),
      })
    );
  };

  return (
    <AppLayout className="flex flex-col justify-between font-lal px-[3.875rem] pt-[9.5rem] pb-[4.25rem]">
      <div className="flex flex-col">
        <h1 className="text-[1.875rem] text-white text-center leading-[2.979rem] tracking-[-0.25px] mx-[-1rem]">
          RESET PASSWORD
        </h1>
        <p className="font-inter text-[0.875rem] text-white text-center leading-[1.094rem] tracking-[-0.4px] mb-7 max-w-[15.313rem]">
          To recover your account, please input the following information
        </p>
        <div className="mb-4 w-full">
          <Input
            label="Enter Your Email"
            type="email"
            value={email}
            onChange={setEmail}
            password
            hideForgotPassword
          />
        </div>
      </div>
      <Button
        text="Proceed"
        className="!text-[1.375rem] !p-2 mb-4"
        loading={loading}
        disabled={!email}
        onClick={handleSubmit}
      />
    </AppLayout>
  );
};

export default ForgotPassword;
