import lemonSm from "../../assets/images/lemon-sm.svg";
import lemonLg from "../../assets/images/lemon-lg.svg";
import check from "../../assets/images/lemon-check.svg";

const colorMap = {
  white: "#FFFFFF",
  purple: "#8538E8",
  teal: "#26A69A",
};

const Lemon = ({
  color = "white",
  number,
  checked,
  onClick,
  className,
}: {
  color: keyof typeof colorMap;
  number: number;
  checked?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className={`relative ${className ? className : ""}`} onClick={onClick}>
      <img
        loading="lazy"
        src={color === "white" ? lemonSm : lemonLg}
        alt="lemon"
        className={`${
          color === "white"
            ? "h-[6.5rem] w-[6.5rem]"
            : "h-[8.625rem] w-[8.625rem]"
        }`}
      />
      <img
        loading="lazy"
        src={check}
        alt="check"
        className={`absolute bottom-[0.5rem] right-[0.5rem] w-[2.625rem] h-[2.625rem] transition-opacity duration-1000 ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={`font-inter font-black text-center rounded-full absolute flex justify-center items-center transition-opacity duration-1000 ${
          checked ? "opacity-0" : "opacity-100"
        } ${
          color === "white"
            ? "text-crimson text-[1.417rem] leading-[1.715rem] tracking-[-0.26px] w-[2.625rem] h-[2.625rem] bottom-[0.5rem] right-[0.5rem]"
            : "text-white text-[1.875rem] leading-[2.25rem] tracking-[-0.34px] w-[3.5rem] h-[3.5rem] bottom-[0.5rem] right-0"
        }`}
        style={{ backgroundColor: colorMap[color] }}
      >
        {number}
      </span>
    </div>
  );
};

export default Lemon;
