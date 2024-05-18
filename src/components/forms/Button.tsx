import { CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Button = ({
  text,
  className,
  loading,
  onClick,
  disabled,
}: {
  text: string;
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
      className={`bg-yellow w-full p-[0.813rem] flex justify-center items-center text-center rounded-[6px] font-inter text-[1rem] font-bold ${
        className ? className : ""
      } ${disabled ? "opacity-75" : ""}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <PacmanLoader cssOverride={override} size={15} color="#FFFFFF" />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
