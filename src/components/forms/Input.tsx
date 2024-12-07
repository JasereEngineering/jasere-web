import { useState } from "react";
import { useNavigate } from "react-router-dom";

import passwordIcon from "../../assets/images/password-icon.svg";

import * as ROUTES from "../../routes";

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
  const navigate = useNavigate();

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
      {label ? (
        <div className="font-inter font-light text-white text-[0.688rem] leading-[0.859rem] flex justify-between items-center mb-1">
          <span>{label}</span>
          {password && !hideForgotPassword ? (
            <span
              className="text-[#E6A101] text-[0.75rem] font-bold leading-[0.938rem]"
              onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
            >
              Forgot Password
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative">
        <input
          className={`rounded-[4px] border-[1.5px] border-[#DADADA] bg-inherit px-3 py-[0.656rem] text-[1rem] leading-[1.094rem] text-white w-full ${
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
        {initialType === "password" ? (
          <img
            loading="lazy"
            src={passwordIcon}
            alt="password icon"
            className="right-[0.75rem] bottom-[0.725rem] absolute"
            onClick={() => setType(type === "password" ? "text" : "password")}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Input;
