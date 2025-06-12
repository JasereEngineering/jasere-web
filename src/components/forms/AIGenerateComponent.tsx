import { useState } from "react";

import TextArea from "./TextArea";
import { CustomSlider } from "./CustomSlider";
import ToggleSwitch from "./ToggleSwitch";

import starsBlack from "../../assets/images/starsBlack.svg";
import stars from "../../assets/images/stars.svg";
import reload from "../../assets/images/reload.svg";
import edit from "../../assets/images/edit-pen.svg";
import deleteIcon from "../../assets/images/delete.svg";
import promptBg from "../../assets/images/promptBg.png";

const AIGenerateComponent = () => {
  const [question, setQuestion] = useState("");
  const [step, setStep] = useState("initial");
  const [results, setResults] = useState<string[]>([]);
  const [timeAllowed, setTimeAllowed] = useState<number>(10);
  const [isPenaltyActive, setIsPenaltyActive] = useState<boolean>(false);

  const handleGenerate = () => {
    setStep("loading");
    // Simulate API call or processing
    setTimeout(() => {
      setResults([
        "Gift everyone in the room a $100 bill",
        "When last did you steal?",
      ]);
      setStep("results");
    }, 2000);
  };

  const handleDelete = (indexToDelete: number) => {
    setResults(results.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="fixed bottom-0 left-0 h-[600px] w-full bg-[#1E1E1E] text-white rounded-t-[20px] shadow-lg z-50">
      <div className="flex items-center justify-center mt-[14px]">
        <div className="bg-[#D9D9D924] h-2 w-40 rounded-full" />
      </div>

      {step !== "prompt" && (
        <h2 className="text-2xl mb-4 mt-6 text-center">Generate with AI</h2>
      )}

      {step === "initial" && (
        <div className="px-6 relative h-full">
          <div>
            <TextArea
              label=""
              placeholder="What type of challenges do you have in mind?"
              value={question}
              onChange={setQuestion}
            />
            <p className="text-[#B1B1B1] text-[13px] font-bold font-man tracking-[-0.15px]">
              E.g outdoor workout challenges, adult rated challenges
            </p>
          </div>
          <div className="absolute bottom-32 left-0 right-0 px-8">
            <button
              onClick={handleGenerate}
              className="py-[14px] w-full bg-white flex items-center justify-between px-5 rounded-full text-[#1E1E1E] text-2xl"
            >
              Generate Challenges
              <img src={starsBlack} alt="stars" />
            </button>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="px-6 relative h-full flex items-center justify-center">
          <div>
            <p className="text-center tracking-[-0.15px] text-[22px] max-w-[235px]">
              Generating your challenges, please wait...
            </p>
          </div>
          <div className="absolute bottom-32 left-0 right-0 px-8">
            <button
              disabled
              className="py-[14px] w-full bg-[#424242] flex items-center justify-center px-5 rounded-full text-[#777777] text-2xl opacity-50 cursor-not-allowed"
            >
              Please wait...
            </button>
          </div>
        </div>
      )}

      {step === "results" && (
        <div className="px-6 relative h-full">
          <div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <img src={stars} alt="stars" className="w-6 h-6" />
                <p className="text-center text-white text-sm">
                  Here are your results
                </p>
              </div>
              <button>
                <img src={reload} alt="reload" />
              </button>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-5 rounded-[5px] bg-[#2C2C2C]"
                >
                  <p className="font-inter text-base tracking-[-0.4px]">
                    {result}
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setStep("editResult")}>
                      <img src={edit} alt="edit" />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-32 left-0 right-0 px-8">
            <button
              onClick={() => setStep("initial")}
              className="py-[14px] w-full bg-white flex items-center justify-center px-5 rounded-full text-[#1E1E1E] text-2xl"
            >
              Add to Challenges
            </button>
          </div>
        </div>
      )}

      {step === "editResult" && (
        <div className="px-6 relative h-full">
          <div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <img src={stars} alt="stars" className="w-6 h-6" />
                <p className="text-center text-white text-sm">
                  Here are your results
                </p>
              </div>
              <button>
                <img src={reload} alt="reload" />
              </button>
            </div>{" "}
            <div className="mt-16">
              <p className="text-white font-normal font-manjari text-center text-2xl mb-6 tracking-[-0.38px]">
                Gift everyone in the room a $100 bill
              </p>
              <p className="font-manjari text-sm text-center text-white tracking-[-0.38px]">
                Penalty: take 3 shots in a go
              </p>
            </div>
            <div className="my-6">
              <CustomSlider
                min={0}
                max={60}
                value={timeAllowed}
                onChange={setTimeAllowed}
                label="Time Allowed to Respond"
                valueDisplay={(val: number) => `${val}s`}
                discrete={false}
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
          <div className="absolute bottom-32 left-0 right-0 px-8">
            <button
              onClick={() => setStep("prompt")}
              className="py-[14px] w-full bg-white flex items-center justify-center px-5 rounded-full text-[#1E1E1E] text-2xl"
            >
              Add to Challenges
            </button>
          </div>
        </div>
      )}

      {step === "prompt" && (
        <div className="relative h-full">
          <img src={promptBg} alt="prompt" className="mx-auto" />
          <div className="bg-[#F7941D] px-6 pt-7 pb-12 ">
            <h1 className="text-[32px] text-center mb-4 font-normal text-[#1E1E1E]">
              Having a great time?
            </h1>
            <p className="text-center font-manjari mb-8 text-[#1E1E1E] tracking-[-0.38px] text-[20px]">
              Sign up to Jasere Games and create your own custom games to play
              with friends!{" "}
            </p>

            <div className="flex flex-col gap-4 w-full">
              <button className="py-3 w-full bg-[#1E1E1E] flex items-center justify-center px-5 rounded-full text-white text-2xl">
                Sign Up Now!
              </button>
              <button
                onClick={() => setStep("initial")}
                className="py-3 w-full bg-transparent flex items-center justify-center px-5 rounded-full border border-[#1E1E1E] text-[#1E1E1E] text-2xl"
              >
                I'll do this later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIGenerateComponent;
