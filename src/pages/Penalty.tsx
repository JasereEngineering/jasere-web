import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Range from "../components/forms/Range";

import helpIcon from "../assets/images/help-icon.svg";
import check from "../assets/images/check-sign-white.svg";
import info from "../assets/images/info-icon.svg";

import { RootState, AppDispatch } from "../store";
import { fetchGameCategories, selectCategory } from "../store/features/game";
import * as ROUTES from "../routes";
import { GameState } from "../types";

const Penalty = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, game } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [trigger, setTrigger] = useState("");
  const [duration, setDuration] = useState(30);
  const [fine, setFine] = useState(1000);

  const handleClick = () => {
    // if (category !== "new") dispatch(selectCategory(category));
    // navigate(
    //   category === "new"
    //     ? ROUTES.SCRAMBLED_WORDS.NEW_GAME
    //     : ROUTES.SCRAMBLED_WORDS.DIFFICULTY
    // );
  };

  useEffect(() => {
    dispatch(fetchGameCategories(game as string));
  }, [dispatch, game]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-4 pt-[8rem] pb-[4.25rem]">
      <div>
        <div className="flex justify-between mb-9">
          <div>
            <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
              LEMON LEMON
            </h1>
            <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
              Set penalties for round failure
            </p>
          </div>
          <img
            loading="lazy"
            src={helpIcon}
            alt="help"
            className="h-[2rem] w-[2rem] pt-2"
          />
        </div>
        <div className="p-2">
          <div className="mb-4 w-full">
            <Select
              label="Penalty Trigger"
              placeholder="Select trigger"
              value={trigger}
              onChange={setTrigger}
              options={[
                { value: "1", label: "Player picks wrong answer" },
                { value: "2", label: "Time runs out" },
              ]}
              required
            />
          </div>
          <div className="mb-5 w-full">
            <Range
              label="Time Allowed For Penalty"
              value={duration}
              onChange={setDuration}
              min={10}
              max={60}
              required
            />
          </div>
          <div className="mb-[4.75rem] w-full">
            <Input
              label="Escape Fine"
              type="number"
              value={fine}
              onChange={setFine}
              min={100}
            />
          </div>
          <div className="flex pl-6">
            <img
              loading="lazy"
              src={info}
              alt="info"
              className="mr-[0.625rem] h-[1.063rem] w-[1.063rem]"
            />
            <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
              Penalty can only be confirmed by the host player which then
              progresses the game to the next round after confirmation
            </p>
          </div>
        </div>
      </div>
      <Button text="Next" onClick={handleClick} />
    </AppLayout>
  );
};

export default Penalty;
