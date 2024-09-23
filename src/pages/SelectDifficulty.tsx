import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import helpIcon from "../assets/images/help-icon.svg";
import check from "../assets/images/check-sign-white.svg";

import { RootState, AppDispatch } from "../store";
import { fetchGameLevels, selectLevel } from "../store/features/game";
import * as ROUTES from "../routes";
import { GameState } from "../types";
import { colorMap, titleMap } from "../helpers/misc";

const SelectDifficulty = () => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { levels, loading } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [level, setLevel] = useState(1);

  const handleClick = () => {
    dispatch(selectLevel(level));
    navigate(
      ROUTES.PLAY.CREATE_GAME_SESSION_FOR(gameTitle?.toLowerCase() as string)
    );
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
            <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px] uppercase">
              {
                titleMap[
                  gameTitle
                    ?.toLowerCase()
                    .replaceAll(" ", "-") as keyof typeof titleMap
                ]
              }
            </h1>
            <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
              Select Difficulty
            </p>
          </div>
          <img loading="lazy" src={helpIcon} alt="help" className="h-[2rem] w-[2rem] pt-2" />
        </div>
        {levels?.map((l, i) => (
          <div
            className={`border rounded-[20px] px-5 py-3 mb-3 ${
              level === l.level_value
                ? `border-[${
                    colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  }] bg-[${
                    colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  }]`
                : "border-white"
            }`}
            onClick={() => setLevel(l.level_value)}
            key={i}
            style={{
              backgroundColor:
                level === l.level_value
                  ? colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  : "transparent",
              borderColor:
                level === l.level_value
                  ? colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  : "white",
            }}
          >
            <div className="flex justify-between">
              <h5 className="text-[1.375rem] leading-[2.154rem] tracking-[-0.25px] capitalize">
                {l.level}
              </h5>
              {level === l.level_value ? <img loading="lazy" src={check} alt="check" /> : null}
            </div>
            {level === l.level_value ? (
              <p className="font-lex text-[0.75rem] leading-[0.938rem] tracking-[-0.25px] max-w-[12.75rem]">
                {l.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <Button text="Next" onClick={handleClick} />
    </AppLayout>
  );
};

export default SelectDifficulty;
