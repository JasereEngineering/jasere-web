import React, { useState } from "react";

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
        className="h-[1.25rem] w-[1.25rem]"
      />
      <label htmlFor={id} className="font-pop font-medium text-[1rem] ml-2">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
