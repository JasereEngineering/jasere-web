import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import { CustomSlider } from "../../../components/forms/CustomSlider";
import Input from "../../../components/forms/Input";
import Select from "../../../components/forms/Select";
import ToggleSwitch from "../../../components/forms/ToggleSwitch";

import truthAndDare from "../../../assets/images/truthAndDare.png";
import chevronRight from "../../../assets/images/chevron-right.svg";
import stars from "../../../assets/images/stars.svg";

import { colorMap, titleMap } from "../../../helpers/misc";
import * as ROUTES from "../../../routes";
import AIGenerateComponent from "../../../components/forms/AIGenerateComponent";

function TruthAndDareAddQuestion() {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [question, setQuestion] = useState<string>("");
  const [penalty, setPenalty] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("");
  const [timeAllowed, setTimeAllowed] = useState<number>(10);
  const [isPenaltyActive, setIsPenaltyActive] = useState<boolean>(false);
  const [showAIComponent, setShowAIComponent] = useState<boolean>(false);
  const [isSlidingOut, setIsSlidingOut] = useState<boolean>(false);
  const aiComponentRef = useRef<HTMLDivElement>(null);

  const handleGenerateClick = () => {
    setShowAIComponent(true);
    setIsSlidingOut(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        aiComponentRef.current &&
        !aiComponentRef.current.contains(event.target as Node)
      ) {
        setIsSlidingOut(true);
        setTimeout(() => setShowAIComponent(false), 300);
      }
    };

    if (showAIComponent) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAIComponent]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div>
        <div className="flex justify-between">
          <div className="h-[115px] w-full relative">
            <img
              loading="lazy"
              src={truthAndDare}
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
              <h1 className="text-2xl leading-[28px] tracking-[-0.25px] uppercase">
                {titleMap[gameTitle?.toLowerCase() as keyof typeof titleMap]}
              </h1>
              <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px]">
                Edit custom categories
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-5">
          <div className="flex items-center justify-between w-full mb-4">
            <h5 className="text-[24px] tracking-[-0.4px] capitalize ">
              Add Question
            </h5>
            <button className="px-3 py-[6px] gap-1 flex items-center justify-center rounded-xl bg-[#FBAF00] text-xs font-lal text-white">
              View Saved Questions
              <img
                src={chevronRight}
                alt="chevron right"
                className="mb-[2px]"
              />
            </button>
          </div>

          <button
            onClick={handleGenerateClick}
            className="mb-4 py-4 w-full flex items-center justify-between px-5 rounded-[20px] text-white text-xl"
            style={{
              background: "linear-gradient(90deg, #F7941D 0%, #B96501 100%)",
            }}
          >
            Generate with AI
            <img src={stars} alt="stars" />
          </button>

          <div className="mb-6">
            <Input
              type="text"
              label="Enter question"
              value={question}
              onChange={setQuestion}
            />
          </div>

          <div className="mb-6">
            <Select
              label="Category"
              placeholder="Select category"
              value={questionType}
              onChange={setQuestionType}
              options={[
                { value: "1", label: "Category 1" },
                { value: "2", label: "Category 2" },
              ]}
              required
            />
          </div>

          <div className="mb-10">
            <CustomSlider
              min={0}
              max={60}
              value={timeAllowed}
              onChange={setTimeAllowed}
              label="Time Allowed to Answer"
              valueDisplay={(val: number) => `${val}s`}
              discrete={false}
            />
          </div>

          <div className="mb-6">
            <Input
              type="text"
              label="Enter penalty"
              value={penalty}
              onChange={setPenalty}
            />
          </div>

          <div className="flex mb-6 items-center justify-between w-full">
            <h2>Activate Penalty</h2>
            <ToggleSwitch
              isOn={isPenaltyActive}
              handleToggle={() => setIsPenaltyActive(!isPenaltyActive)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 px-4">
        <button className="py-3 text-2xl flex items-center justify-center px-1 bg-[#2CB553] w-[54%] rounded-lg">
          Save Question
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

      {showAIComponent && (
        <div className="fixed inset-0 bg-[#49454569] bg-opacity-70 flex justify-center items-end z-50">
          <div
            ref={aiComponentRef}
            className={`w-full bg-[#1e1e1e] p-4 text-white rounded-t-2xl shadow-2xl ${isSlidingOut ? "animate-slide-out" : "animate-slide-up"}`}
            style={{ animationDuration: "0.3s" }}
          >
            <AIGenerateComponent />
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default TruthAndDareAddQuestion;
