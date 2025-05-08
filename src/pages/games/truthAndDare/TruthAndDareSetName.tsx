import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import RoundedButton from "../../../components/forms/RoundedButton";

import Tooltip from "../../../assets/images/tooltip.svg";

import * as ROUTES from "../../../routes";

const TruthAndDareSetName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="px-4">
        <div className="flex items-center justify-between w-full mt-6">
          <div className="flex flex-col text-white">
            <h1 className="text-[30px] tracking-[-0.25px]">TRUTH OR DARE!</h1>
            <p className="font-inter text-sm tracking-[-0.4px]">
              Set a name for your game session
            </p>
          </div>

          <button>
            <img src={Tooltip} alt="tooltip" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 mb-36">
        <Input
          type="text"
          label="Name of Game"
          placeholder="Enter name of game"
          value={name}
          onChange={setName}
        />
      </div>

      <RoundedButton
        text="Next"
        onClick={() => navigate(ROUTES.TRUTH_AND_DARE.LOBBY)}
        loading={false}
      />
    </AppLayout>
  );
};

export default TruthAndDareSetName;
