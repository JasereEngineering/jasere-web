import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import logo from "../assets/images/full-logo.svg";

import * as ROUTES from "../routes";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="flex flex-col">
      <div className="flex grow justify-center items-center">
        <img src={logo} alt="logo" />
      </div>
      <div className="p-[2.375rem] w-full">
        <Button
          text="Get Started"
          onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
        />
      </div>
    </AppLayout>
  );
};

export default GetStarted;
