import { CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Button = ({
  text,
  className,
  loading,
  onClick,
  disabled,
  type,
}: {
  text: string;
  type?: "submit" | "button";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (e: any) => void;
}) => {
  const override: CSSProperties = {
    borderColor: "#FFFFFF",
    background: "transparent",
  };

  return (
    <button
      className={`w-full p-[0.75rem] flex justify-center items-center text-center rounded-[78px] font-lal text-[1.5rem] ${
        className ? className : ""
      } ${disabled ? "opacity-75" : ""}`}
      onClick={onClick}
      disabled={loading || disabled}
      type={type}
    >
      {loading ? (
        <PacmanLoader cssOverride={override} size={15} color="#1E1E1E" />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
