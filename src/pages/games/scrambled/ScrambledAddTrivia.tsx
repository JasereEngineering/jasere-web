import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import { CustomSlider } from "../../../components/forms/CustomSlider";

import chevronRight from "../../../assets/images/chevron-right.svg";
import scrambled from "../../../assets/images/scrambled.jpg";

import { titleMap, colorMap } from "../../../helpers/misc";
import * as ROUTES from "../../../routes";

const ScrambledAddTrivia = () => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [question, setQuestion] = useState("");
  const [hint, setHint] = useState("");
  const [answer, setAnswer] = useState("");
  const [timeAllowed, setTimeAllowed] = useState(10);

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
          <div className="flex items-center justify-between w-full">
            <h5 className="text-[24px] tracking-[-0.4px] capitalize ">
              Add Trivia
            </h5>

            <button className="px-6 py-[6px] gap-1 flex items-center justify-center rounded-xl bg-[#FBAF00] text-xs font-lal text-white">
              View Saved Trivia
              <img
                src={chevronRight}
                alt="chevron right"
                className="mb-[2px]"
              />
            </button>
          </div>

          <h2 className="font-lal mt-3 text-[1.125rem] leading-[1.75rem] tracking-[-0.25px] mb-2">
            Step 2 of 3
          </h2>
          <div className="flex items-center gap-x-2 mb-6">
            <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-white border border-white"></div>
            <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-white border border-white"></div>
            <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-[#565656]"></div>
          </div>

          <div className="mb-6">
            <Input
              type="text"
              label="Enter Word or Question"
              value={question}
              onChange={setQuestion}
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              label="Enter Hint (Optional)"
              value={hint}
              onChange={setHint}
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              label="Enter Answer"
              value={answer}
              onChange={setAnswer}
            />
          </div>

          <CustomSlider
            min={0}
            max={20}
            value={timeAllowed}
            onChange={setTimeAllowed}
            label="Time Allowed to Answer"
            valueDisplay={(val) => `${val}s`}
            discrete={false}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 px-4">
        <button className="py-3 text-2xl flex items-center justify-center px-1 bg-[#2CB553] w-[54%] rounded-lg">
          Save Trivia
        </button>
        <button
          onClick={() =>
            navigate(ROUTES.SCRAMBLED_WORDS.SAVED_TRIVIA_FOR("scrambled-words"))
          }
          className="bg-white flex items-center justify-center text-2xl text-[#1E1E1E] rounded-full w-[46%] py-3 px-14"
        >
          Next
        </button>
      </div>
    </AppLayout>
  );
};

export default ScrambledAddTrivia;
