const Select = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  className,
  options,
}: {
  label?: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    onChange(value);
  };

  return (
    <div className="w-full flex flex-col font-lex">
      {label ? (
        <label className="font-light text-white text-[0.688rem] leading-[0.859rem] mb-1">
          {label}
        </label>
      ) : null}
      <div className="">
        <select
          className={`rounded-[4px] border-[1.5px] border-[#DADADA] bg-inherit px-3 py-[0.656rem] text-[0.813rem] leading-[0.983rem] text-white w-full ${
            className ? className : ""
          }`}
          value={value}
          onChange={handleChange}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : (
            ""
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
