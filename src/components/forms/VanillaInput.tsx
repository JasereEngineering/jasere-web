import { useState } from "react";
import { useNavigate } from "react-router-dom";

import passwordIcon from "../../assets/images/password-icon.svg";

import * as ROUTES from "../../routes";

const VanillaInput = ({
  label,
  required,
  password,
  disabled,
  type: initialType,
  value,
  onChange,
  placeholder,
  className,
  min,
  hideForgotPassword,
  maxLength,
}: {
  label?: string;
  required?: boolean;
  password?: boolean;
  disabled?: boolean;
  type: string;
  value: string | number;
  placeholder?: string;
  className?: string;
  onChange: (value: any) => void;
  min?: number;
  hideForgotPassword?: boolean;
  maxLength?: number;
}) => {
  const [type, setType] = useState(initialType || "text");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    let value = e.target.value;
    onChange(value);
  };
  return (
    <div className="w-full flex flex-col font-lex">
      <div className="relative">
        <input
          className={`border-[1.5px] border-[#DADADA] bg-inherit px-3 py-[0.656rem] text-[1rem] leading-[1.094rem] text-white w-full ${
            type === "password" ? "font-man" : "font-lex"
          } ${className ? className : ""}`}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default VanillaInput;
