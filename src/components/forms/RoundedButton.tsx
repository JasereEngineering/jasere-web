import { CSSProperties } from "react";
import { PacmanLoader } from "react-spinners";

const RoundedButton = ({
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
      className={`capitalize h-16 bg-white font-lal text-[1.5rem] rounded-full leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center fixed bottom-8 left-8 right-8 ${className}`}
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

export default RoundedButton;
