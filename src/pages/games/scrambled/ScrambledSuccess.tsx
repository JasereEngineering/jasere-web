import { useParams } from "react-router-dom";

import AppLayout from "../../../components/layouts/AppLayout";

import scrambled from "../../../assets/images/scrambled.jpg";

import { titleMap, colorMap } from "../../../helpers/misc";

const ScrambledSuccess = () => {
  const { gameTitle } = useParams();

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div>
        {" "}
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
        <div className="mt-[240px] max-w-[232px] tracking-[-0.4px] m-auto text-2xl text-center">
          <p>"All White House Party" successfully created</p>
        </div>
        <div className="flex flex-wrap flex-col w-full justify-between items-center gap-4 px-4 mb-[56px] fixed bottom-8">
          <button className="py-[14px] text-2xl flex items-center justify-center px-6 bg-white text-black w-full rounded-full">
            Let's Play
          </button>
          <button className="bg-transparent border border-white flex items-center justify-center text-2xl text-white rounded-full w-full py-[14px] px-14">
            View Games
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ScrambledSuccess;
