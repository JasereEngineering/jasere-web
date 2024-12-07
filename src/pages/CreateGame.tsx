import { useState } from "react";

import AppLayout from "../components/layouts/AppLayout";
import Input from "../components/forms/Input";
// import Select from "../components/forms/Select";
// import Range from "../components/forms/Range";
import TextArea from "../components/forms/TextArea";

import twoPlayers from "../assets/images/2players.svg";
import threePlayers from "../assets/images/3players.svg";
import fourPlayers from "../assets/images/4players.svg";
import fourPlayersDark from "../assets/images/4players-dark.svg";
import FooterButton from "../components/forms/FooterButton";

const CreateGame = () => {
  const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [questions, setQuestions] = useState(5);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };

  return (
    <AppLayout className="flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-12 bg-black">
      <div>
        <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
          CREATE A GAME
        </h1>
        <p className="font-inter text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-5">
          Create a new game with your own set of rules
        </p>
        <h2 className="font-lal text-[1.125rem] leading-[1.75rem] tracking-[-0.25px] mb-2">
          Step 1 of 2
        </h2>
        <div className="flex items-center gap-x-2 mb-[0.875rem]">
          <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-white border border-white"></div>
          <div className="rounded-[2px] h-[0.25rem] w-[6.25rem] bg-[#565656]"></div>
        </div>
        <div className="mb-[0.875rem]">
          <Input
            type="text"
            label="Name of Game"
            placeholder="Enter name of game"
            value={title}
            onChange={setTitle}
          />
        </div>
        <div className="mb-[1.125rem]">
          <TextArea
            label="Name of Game"
            placeholder="Enter name of game"
            value={title}
            onChange={setTitle}
          />
        </div>
        <label className="block font-inter font-light text-white text-[0.688rem] leading-[0.859rem] mb-[0.875rem]">
          Number of players
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-white rounded-[15px] p-[0.625rem] flex items-center">
            <img
              loading="lazy"
              src={twoPlayers}
              alt="2 players"
              className="mr-[0.563rem]"
            />
            <span className="font-lal text-[0.849rem] leading-[1.331rem] tracking-[-0.34px]">
              2 Players
            </span>
          </div>
          <div className="border border-white rounded-[15px] p-[0.625rem] flex items-center">
            <img
              loading="lazy"
              src={threePlayers}
              alt="3 players"
              className="mr-[0.563rem]"
            />
            <span className="font-lal text-[0.849rem] leading-[1.331rem] tracking-[-0.34px]">
              3 Players
            </span>
          </div>
          <div className="border border-white rounded-[15px] p-[0.625rem] flex items-center">
            <img
              loading="lazy"
              src={fourPlayers}
              alt="4 players"
              className="mr-[0.563rem]"
            />
            <span className="font-lal text-[0.849rem] leading-[1.331rem] tracking-[-0.34px]">
              4 Players
            </span>
          </div>
          <div className="col-span-2 w-fit border border-white rounded-[15px] p-[0.625rem] flex items-center bg-white">
            <img
              loading="lazy"
              src={fourPlayersDark}
              alt="Max players"
              className="mr-[0.563rem]"
            />
            <span className="font-lal text-[0.849rem] leading-[1.331rem] tracking-[-0.34px] text-black">
              Max Players
            </span>
          </div>
        </div>
      </div>
      <FooterButton
            text="Let's Play"
            onClick={() => alert('create game')}
            loading={false}
          />
    </AppLayout>
  );
};

export default CreateGame;
