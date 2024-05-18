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
  placeholder: string;
  className?: string;
  options: { value: string; label: string }[];
  onChange: (value: any) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <div className="">
        <select
          className={`rounded-[6px] border border-[#8692A6] bg-[#282A2F] p-3 font-pop font-medium text-[1rem] text-[#8692A6] w-full ${
            className ? className : ""
          }`}
          value={value}
          onChange={handleChange}
        >
          <option value="" disabled>
            {placeholder}
          </option>
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
