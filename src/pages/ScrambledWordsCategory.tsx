import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Loader from "../components/misc/Loader";

import helpIcon from "../assets/images/help-icon.svg";
import check from "../assets/images/check-sign-white.svg";

import { RootState, AppDispatch } from "../store";
import { fetchGameCategories, selectCategory } from "../store/features/game";
import * as ROUTES from "../routes";
import { GameState } from "../types";

const ScrambledWordsCategory = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, game } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [category, setCategory] = useState(null);

  const handleClick = () => {
    if (category !== "new") dispatch(selectCategory(category));
    navigate(
      category === "new"
        ? ROUTES.SCRAMBLED_WORDS.NEW_GAME
        : ROUTES.SCRAMBLED_WORDS.DIFFICULTY
    );
  };

  useEffect(() => {
    dispatch(fetchGameCategories(game as string));
  }, [dispatch, game]);

  useEffect(() => {
    if (category) return;
    if (!categories.length) return;
    setCategory(categories[0].category_id);
  }, [category, categories]);

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
              Choose Category
            </p>
          </div>
          <img src={helpIcon} alt="help" className="h-[2rem] w-[2rem] pt-2" />
        </div>
        {categories.map((c, i) => (
          <div
            className={`border rounded-[20px] px-5 py-3 flex justify-between items-center  ${
              category === c.category_id
                ? "border-pink bg-pink"
                : "border-white"
            } ${i === categories.length - 1 ? "mb-[9rem]" : "mb-3"}`}
            onClick={() => setCategory(c.category_id)}
            key={i}
          >
            <h5 className="text-[1.375rem] leading-[2.154rem] tracking-[-0.25px] capitalize">
              {c.category_name}
            </h5>
            {category === c.category_id ? (
              <img src={check} alt="check" />
            ) : null}
          </div>
        ))}
      </div>
      <Button text="Next" onClick={handleClick} disabled={!category} />
    </AppLayout>
  );
};

export default ScrambledWordsCategory;
