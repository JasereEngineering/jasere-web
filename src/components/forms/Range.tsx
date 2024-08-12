const Range = ({
  label,
  required,
  value,
  onChange,
  min,
  max,
}: {
  label?: string;
  required?: boolean;
  value: number;
  min: number;
  max: number;
  onChange: (value: any) => void;
}) => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to right, #F34348 0%, #F34348 ${
      ((value - min) / (max - min)) * 100
    }%, #D9D9D9 ${((value - min) / (max - min)) * 100}%, #D9D9D9 100%)`,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    onChange(value);
  };

  return (
    <div className="w-full flex flex-col font-lex">
      {label ? (
        <label className="font-light text-white text-[0.688rem] leading-[0.859rem] mb-2">
          {label}
        </label>
      ) : null}
      <div className="flex flex-col">
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          className="w-full h-[0.313rem] bg-[#F34348] rounded-[10px] appearance-none cursor-pointer mt-[0.625rem] mb-2"
          style={backgroundStyle}
        />
        <div className="flex justify-between items-center relative">
          <span className="font-medium text-[0.875rem] leading-[1.094rem]">
            {min}s
          </span>
          <span className="font-medium text-[0.875rem] leading-[1.094rem]">
            {max}s
          </span>
          <div
            className="absolute bg-white rounded-[30px] p-[0.313rem] font-medium text-[0.875rem] text-center text-crimson leading-[1.094rem] bottom-[-0.625rem] left-[50%]"
            style={{
              left: `calc(${((value - min) / (max - min)) * 100}% - 1.25rem)`,
            }}
          >
            {value}s
          </div>
        </div>
      </div>
    </div>
  );
};

export default Range;
