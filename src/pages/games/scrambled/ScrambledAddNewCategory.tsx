import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import scrambled from "../../../assets/images/scrambled.jpg";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import { CustomSlider } from "../../../components/forms/CustomSlider";
import RoundedButton from "../../../components/forms/RoundedButton";

import { titleMap, colorMap } from "../../../helpers/misc";
import * as ROUTES from "../../../routes";

const ScrambledAddNewCategory = () => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [category, setCategory] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(25);
  const [difficulty, setDifficulty] = useState<"NOOB" | "Bad Guy" | "BOSS">(
    "Bad Guy",
  );

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div>
        <div className="flex justify-between">
          <div className="h-[115px] w-full relative">
            <img
              loading="lazy"
              src={scrambled}
              alt={gameTitle}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute bottom-0 top-0 left-0 inset-0 opacity-75"
              style={{
                backgroundColor:
                  colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap] ||
                  "#000000",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-start justify-center p-4 pl-5">
              <h1 className="-4 text-2xl leading-[28px] tracking-[-0.25px] uppercase">
                {titleMap[gameTitle?.toLowerCase() as keyof typeof titleMap]}
              </h1>
              <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                Edit custom categories
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-5">
          <h5 className="text-[24px] tracking-[-0.4px] capitalize">
            Add New Category{" "}
          </h5>

          <h2 className="font-lal mt-3 text-[1.125rem] leading-[1.75rem] tracking-[-0.25px] mb-2">
            Step 1 of 3
          </h2>
          <div className="flex items-center gap-x-2 mb-6">
            <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-white border border-white"></div>
            <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-[#565656]"></div>
            <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-[#565656]"></div>
          </div>

          <div className="mb-6">
            <Input
              type="text"
              label="Name of Category"
              placeholder="Example: Cars"
              value={category}
              onChange={setCategory}
            />
          </div>

          <CustomSlider
            min={0}
            max={50}
            value={numberOfQuestions}
            onChange={setNumberOfQuestions}
            label="Number of Questions"
            discrete={false}
          />

          <CustomSlider
            min={0}
            max={100}
            value={
              difficulty === "NOOB" ? 0 : difficulty === "Bad Guy" ? 50 : 100
            }
            onChange={(value) => {
              if (value < 33) setDifficulty("NOOB");
              else if (value < 66) setDifficulty("Bad Guy");
              else setDifficulty("BOSS");
            }}
            label="Select Trivia Difficulty"
            valueDisplay={(value) => {
              if (value < 33) return "NOOB";
              if (value < 66) return "Bad Guy";
              return "BOSS";
            }}
            steps={3}
            discrete={true}
          />
        </div>
      </div>

      <RoundedButton
        text="Next"
        onClick={() =>
          navigate(ROUTES.SCRAMBLED_WORDS.ADD_TRIVIA_FOR("scrambled-words"))
        }
        loading={false}
      />
    </AppLayout>
  );
};

export default ScrambledAddNewCategory;
