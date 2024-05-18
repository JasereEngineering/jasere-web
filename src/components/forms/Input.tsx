import { useState } from "react";

import passwordIcon from "../../assets/images/password-icon.svg";

const Input = ({
  label,
  required,
  password,
  disabled,
  type: initialType,
  value,
  onChange,
  placeholder,
  className,
}: {
  label?: string;
  required?: boolean;
  password?: boolean;
  disabled?: boolean;
  type: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: any) => void;
}) => {
  const [type, setType] = useState(initialType || "text");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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
      <div className="relative">
        <input
          className={`rounded-[6px] border border-[#8692A6] bg-[#282A2F] p-3 font-pop font-medium text-[1rem] text-[#8692A6] w-full ${
            className ? className : ""
          }`}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {initialType === "password" ? (
          <img
            src={passwordIcon}
            alt="password icon"
            className="right-[0.75rem] bottom-[0.75rem] absolute"
            onClick={() => setType(type === "password" ? "text" : "password")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Input;
