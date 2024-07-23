import { useState } from "react";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import Input from "../components/forms/Input";
import Select from "../components/forms/Select";
import Range from "../components/forms/Range";

const CreateGame = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState(5);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AppLayout className="flex flex-col justify-between text-white px-4 pt-[7.5rem] pb-12">
      <div>
        <h1 className="font-lal text-[1.875rem] leading-[2.979rem] tracking-[-0.25px]">
          CREATE A GAME
        </h1>
        <p className="font-lex text-[0.875rem] leading-[1.094rem] tracking-[-0.4px] mb-5">
          Create a new game with your own set of rules
        </p>
      </div>
      <Button text="Next" onClick={() => {}} />
    </AppLayout>
  );
};

export default CreateGame;
