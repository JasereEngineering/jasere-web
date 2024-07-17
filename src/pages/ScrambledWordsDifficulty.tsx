import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import helpIcon from "../assets/images/help-icon.svg";
import check from "../assets/images/check-sign-white.svg";

import { RootState, AppDispatch } from "../store";
import { fetchGameLevels, selectLevel } from "../store/features/game";
import * as ROUTES from "../routes";
import { GameState } from "../types";

const ScrambledWordsDifficulty = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { levels, loading } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [level, setLevel] = useState(1);

  const handleClick = () => {
    dispatch(selectLevel(level));
    navigate(ROUTES.SCRAMBLED_WORDS.CREATE_GAME);
  };

  useEffect(() => {
    dispatch(fetchGameLevels());
  }, [dispatch]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between px-4 pt-[8rem] pb-[4.25rem]">
      {loading ? <Loader /> : null}
      <div>
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
              SCRAMBLED WORDS
            </h1>
            <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
              Choose Difficulty
            </p>
          </div>
          <img src={helpIcon} alt="help" className="h-[2rem] w-[2rem] pt-2" />
        </div>
        {levels.map((l, i) => (
          <div
            className={`border  rounded-[20px] px-5 py-3 mb-3 ${
              level === l.level_value ? "border-pink bg-pink" : "border-white"
            }`}
            onClick={() => setLevel(l.level_value)}
            key={i}
          >
            <div className="flex justify-between">
              <h5 className="text-[1.375rem] leading-[2.154rem] tracking-[-0.25px] capitalize">
                {l.level}
              </h5>
              {level === l.level_value ? <img src={check} alt="check" /> : null}
            </div>
            {level === l.level_value ? (
              <p className="font-lex text-[0.75rem] leading-[0.938rem] tracking-[-0.25px] max-w-[12.75rem]">
                Short description of difficulty
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <Button text="Next" onClick={handleClick} />
    </AppLayout>
  );
};

export default ScrambledWordsDifficulty;
