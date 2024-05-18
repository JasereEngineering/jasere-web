import { useState } from "react";

import AppLayout from "../components/layouts/AppLayout";
import Navbar from "../components/navigation/Navbar";
import Button from "../components/forms/Button";

import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Range from "../components/forms/Range";

const CreateScrambledWordsQuestions = () => {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState(30);

  return (
    <AppLayout className="font-lato flex flex-col">
      <Navbar className="mb-5" />
      <div className="grow pb-[2.5rem] px-[2.375rem]">
        <h1 className="font-pop font-semibold text-[2.125rem]">Hi,</h1>
        <p className="font-pop text-[1.125rem] mb-[1.625rem]">
          Create your questions
        </p>
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
        <div className="mb-3">
          <Input
            label="Word"
            placeholder="Enter word"
            type="text"
            value={word}
            onChange={setWord}
            required
          />
        </div>
        <div className="mb-3">
          <Input
            label="Hint"
            placeholder="Enter hint"
            type="text"
            value={hint}
            onChange={setHint}
            required
          />
        </div>
        <div className="mb-8">
          <Range
            label="Number of questions"
            value={duration}
            onChange={setDuration}
            min={10}
            max={60}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2 mb-3">
          <Button
            text="ADD QUESTION"
            className="!bg-pumpkin !font-extrabold "
          />
          <Button
            text="SAVE GAME"
            className="!bg-inherit !font-extrabold border border-violet"
          />
        </div>
        <h6 className="font-pop italic text-[0.813rem] text-center">
          Note: All the fields with (*) are compulsory
        </h6>
      </div>
    </AppLayout>
  );
};

export default CreateScrambledWordsQuestions;
