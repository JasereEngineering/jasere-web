import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
import Checkbox from "../components/forms/Checkbox";
import CategoryRadio from "../components/forms/CategoryRadio";
import Loader from "../components/misc/Loader";

import { RootState, AppDispatch } from "../store";
import { fetchGameCategories, selectCategory } from "../store/features/game";
import * as ROUTES from "../routes";
import { GameState } from "../types";

const ScrambledWords = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, game } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  const [terms, setTerms] = useState(false);
  const [category, setCategory] = useState(null);

  const handleClick = () => {
    if (category !== "new") dispatch(selectCategory(category));
    navigate(
      category === "new"
        ? ROUTES.SCRAMBLED_WORDS.NEW_GAME
        : ROUTES.SCRAMBLED_WORDS.CREATE_GAME
    );
  };

  useEffect(() => {
    dispatch(fetchGameCategories(game as string));
  }, [dispatch, game]);

  return (
    <AppLayout
      className="font-lato flex flex-col"
      navClassName="mb-12 md:mb-[6.25rem]"
    >
      <div className="md:hidden grow pb-[2.5rem] px-[2.375rem]">
        {loading ? <Loader /> : null}
        <div className="bg-[#F28C0D] border border-white p-[0.938rem] font-black text-[1.375rem] text-center shadow-inner mb-3">
          SCRAMBLED WORDS
        </div>
        <h2 className="text-center text-[1rem] font-medium mb-3">
          SELECT YOUR PREFERRED
        </h2>
        <h1 className="text-center text-[2rem] text-orange font-black mb-3">
          CATEGORY
        </h1>
        <div className="mb-4">
          <CategoryRadio
            id="new"
            label="Create your own game"
            name="scrambled-words"
            onChange={setCategory}
            checked={category === "new"}
            className="mb-2"
          />
          {categories.map((c, i) => (
            <CategoryRadio
              id={c.category_id}
              label={c.category_name}
              name="scrambled-words"
              key={c.category_id}
              onChange={setCategory}
              checked={category === c.category_id}
              className={categories.length - 1 === i ? "" : "mb-2"}
            />
          ))}
        </div>
        <Button
          text="CONTINUE"
          className="!bg-[#EE930E] !font-lato !font-black !p-5 mb-3"
          disabled={!terms || !category}
          loading={loading}
          onClick={handleClick}
        />
        <Checkbox
          label="I agree to terms and conditions"
          id="terms"
          checked={terms}
          onChange={() => setTerms(!terms)}
          className="mb-8 pl-2"
        />
        <div className="border border-[#D8EAF1] w-[full] h-[6.375rem] mb-[0.875rem]">
          <video
            autoPlay
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/3195394/3195394-uhd_3840_2160_25fps.mp4"
          />
        </div>
        <h4 className="text-[1rem] text-center">CLICK TO LEARN HOW TO PLAY</h4>
      </div>
      <div className="hidden md:flex pb-[6.25rem] px-[6.25rem]">
        <div className="grow min-w-[44%] mr-[6.25rem]">
          <h2 className="font-medium text-[1.75rem]">SELECT YOUR PREFERRED</h2>
          <h1 className="font-black text-[4rem] text-orange mb-[2.875rem]">
            CATEGORY
          </h1>
          <div className="mb-4">
            <CategoryRadio
              id="new"
              label="Create your own game"
              name="scrambled-words"
              onChange={setCategory}
              checked={category === "new"}
              className="mb-4"
            />
            {categories.map((c, i) => (
              <CategoryRadio
                id={c.category_id}
                label={c.category_name}
                name="scrambled-words"
                key={c.category_id}
                onChange={setCategory}
                checked={category === c.category_id}
                className={categories.length - 1 === i ? "" : "mb-4"}
              />
            ))}
          </div>
          <Button
            text="CONTINUE"
            className="!bg-[#EE930E] md:!bg-violet !font-lato !font-black !p-5 md:text-[1.875rem] md:rounded-[25px] mb-3 md:mb-4"
            disabled={!terms || !category}
            loading={loading}
            onClick={handleClick}
          />
          <Checkbox
            label="I agree to terms and conditions"
            id="terms"
            checked={terms}
            onChange={() => setTerms(!terms)}
            className="mb-8 md:mb-0 pl-2"
          />
        </div>
        <div className="grow flex items-center">
          <div className="w-[1px] h-[70%] bg-[#8692A6] mr-[6.25rem]"></div>
          <div>
            <div className="bg-[#F28C0D] border border-white p-4 font-black text-[2.25rem] text-center shadow-inner mb-5">
              SCRAMBLED WORDS
            </div>
            <div className="border border-[#D8EAF1] w-[full] aspect-video mb-[2.5rem]">
              <video
                autoPlay
                className="w-full h-full object-cover"
                src="https://videos.pexels.com/video-files/3195394/3195394-uhd_3840_2160_25fps.mp4"
              />
            </div>
            <h4 className="text-[1.125rem]">
              CLICK TO LEARN HOW TO PLAY
            </h4>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ScrambledWords;
