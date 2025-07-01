import { useState } from "react";

import AppLayout from "../../../components/layouts/AppLayout";
import ColorSequence from "../../../components/forms/ColorSequence";

function PlayTap() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const colors = [
    { name: "RED", color: "text-[#24E95B]" },
    { name: "GREEN", color: "text-[#2192F2]" },
    { name: "BLUE", color: "text-[#EF4136]" },
  ];

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <div className="grid grid-cols-1 w-[95%] grid-rows-3 h-[calc(100vh-160px)] gap-2.5">
          {colors.map((item, index) => (
            <div
              onClick={openModal}
              key={index}
              className={`flex items-center justify-center rounded-[30px] text-[30px] bg-[#2B2B2A] ${item.color} w-full`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <ColorSequence onClose={closeModal} />}
    </AppLayout>
  );
}

export default PlayTap;
