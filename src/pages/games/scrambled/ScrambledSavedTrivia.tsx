import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";
import Input from "../../../components/forms/Input";
import RoundedButton from "../../../components/forms/RoundedButton";

import scrambled from "../../../assets/images/scrambled.jpg";
import edit from "../../../assets/images/edit-pen.svg";
import deleteIcon from "../../../assets/images/delete.svg";

import { titleMap, colorMap } from "../../../helpers/misc";
import * as ROUTES from "../../../routes";

const ScrambledSavedTrivia = () => {
  const navigate = useNavigate();
  const { gameTitle } = useParams();
  const [search, setSearch] = useState("");

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
          <h5 className="text-[24px] mb-2 tracking-[-0.4px] capitalize ">
            Saved Trivia
          </h5>

          <Input
            type="text"
            value={search}
            onChange={setSearch}
            placeholder="Search for scrambled word"
          />

          <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center justify-between p-5 rounded-[5px] bg-[#2C2C2C]">
              <p className="font-inter text-base tracking-[-0.4px]">Bugatti</p>

              <div className="flex items-center gap-2">
                <button>
                  <img src={edit} alt="edit" />
                </button>

                <button>
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between p-5 rounded-[5px] bg-[#2C2C2C]">
              <p className="font-inter text-base tracking-[-0.4px]">Ronaldo</p>

              <div className="flex items-center gap-2">
                <button>
                  <img src={edit} alt="edit" />
                </button>

                <button>
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoundedButton
        text="Finish"
        className="!bg-[#2CB553] !text-white"
        onClick={() =>
          navigate(ROUTES.SCRAMBLED_WORDS.SUCCESS_FOR("scrambled-words"))
        }
        loading={false}
      />
    </AppLayout>
  );
};

export default ScrambledSavedTrivia;
