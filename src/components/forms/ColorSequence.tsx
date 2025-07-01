interface ColorSequenceProps {
  onClose: () => void;
}

function ColorSequence({ onClose }: ColorSequenceProps) {
  const colors = [
    { bgColor: "bg-[#EF4136]" },
    { bgColor: "bg-[#2CB553]" },
    { bgColor: "bg-[#2192F2]" },
  ];

  return (
    <div className="fixed font-manjari inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#30302F] py-10 px-12 rounded-2xl shadow-lg w-[90%] max-w-md">
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          CORRECT SEQUENCE
        </h2>
        <p className="text-white text-base text-center mb-4">
          Identify the colors of the text{" "}
        </p>
        <div className="bg-white h-[4px] rounded-[3px] mb-6">
          <div className="bg-[#CE0F15] h-full w-1/3 rounded-[3px]"></div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {colors.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-center rounded-[20px] ${item.bgColor} h-[75px]`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ColorSequence;
