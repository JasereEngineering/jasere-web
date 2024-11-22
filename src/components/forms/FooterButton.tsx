import { CSSProperties } from "react";
import { PacmanLoader } from "react-spinners";

const FooterButton = ({
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
      className="capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full fixed bottom-0 left-0 right-0"
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <PacmanLoader cssOverride={override} size={15} color="#1E1E1E" />
      ) : (
        text
      )}
    </button>
  );
};

export default FooterButton;
