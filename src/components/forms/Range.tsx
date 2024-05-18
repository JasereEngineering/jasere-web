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
    backgroundImage: `linear-gradient(to right, #5871EB 0%, #5871EB ${
      (value / max) * 100 - 5
    }%, #D9D9D9 ${(value / max) * 100 - 5}%, #D9D9D9 100%)`,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    onChange(value);
  };

  return (
    <div className="w-full flex flex-col">
      {label ? (
        <label className="font-pop font-medium text-[0.875rem] pl-2 mb-1">
          {label}
          {required ? "*" : ""}
        </label>
      ) : null}
      <div className="flex">
        <span className="font-pop font-medium text-[1rem] mr-1">{min}</span>
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          onChange={handleChange}
          className="w-full h-1 mb-6 bg-[#5871EB] rounded-lg appearance-none cursor-pointer range-sm mt-[0.625rem] mr-1"
          style={backgroundStyle}
        />
        <span className="font-pop font-medium text-[1rem] mr-2">{max}</span>
        <div className="border-[0.5px] border-[#8692A6] bg-[#282A2F] rounded-[6px] flex justify-center items-center min-w-[2rem] h-[1.5rem]">
          {value}
        </div>
      </div>
    </div>
  );
};

export default Range;
