import { useState } from "react";

import check from "../../assets/images/checkmark.svg";

const Checkbox = ({
  label,
  id,
  checked: defaultChecked,
  onChange,
  className,
}: {
  label: any;
  id: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className={`flex items-center ${className ? className : ""}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          onChange();
        }}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={`h-[1rem] w-[1rem] flex justify-center items-center rounded-[10%] ${
          checked ? "bg-[#f7941d]" : "bg-white"
        }`}
      >
        <img src={check} alt="checkbox" />
      </label>
      <label
        htmlFor={id}
        className="font-lex text-[0.875rem] text-white leading-[1.094rem] ml-2"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
