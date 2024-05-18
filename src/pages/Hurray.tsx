import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import hurray from "../assets/images/hurray.svg";

import * as ROUTES from "../routes";

const Hurray = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="flex flex-col justify-center items-center p-[2.375rem]">
      <img src={hurray} alt="hurray icon" className="mb-[0.625rem]" />
      <h1 className="font-pop font-semibold text-[1.25rem]">Hurray!!!</h1>
      <p className="font-pop font-light text-[1.25rem] mb-[1.875rem]">
        You are now official
      </p>
      <Button
        text="Get back to gaming"
        className="font-medium"
        onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
      />
    </AppLayout>
  );
};

export default Hurray;
