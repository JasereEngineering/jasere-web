const GameCard = ({
  name,
  image,
  pending,
  onClick,
  onMouseEnter,
  onMouseLeave,
  hue,
}: {
  hue?: string;
  name: string;
  image: string;
  pending?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <div
      className={`aspect-square rounded-[18px] relative ${
        pending ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="h-full w-full rounded-[18px] object-cover"
      />
      <div
        className={`absolute bottom-0 top-0 left-0 rounded-[18px] inset-0 opacity-75 bg-[${
          hue ? hue : ""
        }]`}
        style={{ backgroundColor: hue }}
      ></div>
      <p className="uppercase font-lal text-[1.5rem] leading-[2.25rem] tracking-[-0.19px] absolute max-w-[9rem] bottom-0 left-[1rem]">
        {name}
      </p>
    </div>
  );
};

export default GameCard;
