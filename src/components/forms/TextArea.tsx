import { useState } from "react";

import passwordIcon from "../../assets/images/password-icon.svg";

const TextArea = ({
  label,
  disabled,
  value,
  onChange,
  placeholder,
  className,
}: {
  label?: string;
  disabled?: boolean;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: any) => void;
}) => {
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
        <div className="font-lex font-light text-white text-[0.688rem] leading-[0.859rem] flex justify-between items-center mb-1">
          <span>{label}</span>
        </div>
      ) : null}
      <div className="relative">
        <textarea
          className={`rounded-[4px] border-[1.5px] border-[#DADADA] bg-inherit px-3 py-[0.656rem] text-[0.875rem] leading-[1.094rem] text-white w-full font-lex ${
            className ? className : ""
          }`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={5}
        />
      </div>
    </div>
  );
};

export default TextArea;
