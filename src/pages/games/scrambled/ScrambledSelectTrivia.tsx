import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import RoundedButton from "../../../components/forms/RoundedButton";
import Input from "../../../components/forms/Input";

import scrambled from "../../../assets/images/scrambled.jpg";
import select from "../../../assets/images/selectIcon.svg";

import { titleMap, colorMap } from "../../../helpers/misc";
import * as ROUTES from "../../../routes";

const ScrambledSelectTrivia = () => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [search, setSearch] = useState("");
  const [selectedTrivia, setSelectedTrivia] = useState<string[]>([]);
  const [triviaList] = useState([
    "Buffalo",
    "American Eagle",
    "Gazelle",
    "Bugatti",
    "Ronaldo",
  ]);

  const filteredTrivia = triviaList.filter((trivia) =>
    trivia.toLowerCase().includes(search.toLowerCase()),
  );

  const handleTriviaToggle = (trivia: string) => {
    setSelectedTrivia((prev) =>
      prev.includes(trivia)
        ? prev.filter((item) => item !== trivia)
        : [...prev, trivia],
    );
  };

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
          <div className="flex items-center">
            <h5 className="text-[24px] tracking-[-0.25px] capitalize">
              Animals Category
            </h5>
          </div>

          <p className="font-inter mb-5 text-sm">
            Select Trivia ({selectedTrivia.length} of {triviaList.length}{" "}
            selected)
          </p>

          <Input
            type="text"
            value={search}
            onChange={setSearch}
            placeholder="Search for a trivia"
          />

          <div className="mt-5 flex flex-col gap-2">
            {filteredTrivia.map((trivia) => (
              <div
                key={trivia}
                className="p-5 rounded-[5px] bg-[#2C2C2C] flex items-center justify-between"
                onClick={() => handleTriviaToggle(trivia)}
              >
                <p className="font-inter text-base tracking-[-0.4px]">
                  {trivia}
                </p>
                <div
                  className={`w-5 h-5 rounded-full border ${selectedTrivia.includes(trivia) ? "border-white" : "border-white"}`}
                >
                  {selectedTrivia.includes(trivia) && (
                    <img src={select} alt="select-icon" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RoundedButton
        text="Save"
        onClick={() =>
          navigate(ROUTES.SCRAMBLED_WORDS.SUCCESS_FOR("scrambled-words"))
        }
        loading={false}
      />
    </AppLayout>
  );
};

export default ScrambledSelectTrivia;
