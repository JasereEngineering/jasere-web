import { useState } from "react";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Range from "../components/forms/Range";

const CreateScrambledWordsGame = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState(5);

  return (
    <AppLayout className="font-lato flex flex-col" navClassName="mb-5">
      <div className="grow pb-[2.5rem] px-[2.375rem]">
        <h1 className="font-pop font-semibold text-[2.125rem]">Hello,</h1>
        <p className="font-pop text-[1.125rem] mb-[1.625rem]">
          Create your own game
        </p>
        <div className="mb-3">
          <Input
            label="Title of game"
            placeholder="Enter game title"
            type="text"
            value={title}
            onChange={setTitle}
            required
          />
        </div>
        <div className="mb-3">
          <Select
            label="Category"
            placeholder="Select category"
            value={category}
            onChange={setCategory}
            options={[
              { value: "1", label: "Category 1" },
              { value: "2", label: "Category 2" },
            ]}
            required
          />
        </div>
        <div className="mb-8">
          <Range
            label="Number of questions"
            value={questions}
            onChange={setQuestions}
            min={1}
            max={10}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2 mb-3">
          <Button text="SAVE GAME" className="!bg-pumpkin !font-extrabold " />
          <Button text="NEXT" className="!bg-pumpkin !font-extrabold " />
        </div>
        <h6 className="font-pop italic text-[0.813rem] text-center">
          Note: All the fields with (*) are compulsory
        </h6>
      </div>
    </AppLayout>
  );
};

export default CreateScrambledWordsGame;
