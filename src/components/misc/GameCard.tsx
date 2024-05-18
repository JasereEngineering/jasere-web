const GameCard = ({
  name,
  image,
  pending,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  name: string;
  image: string;
  pending?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <div
      className="font-lato cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <div className="bg-gradient-to-r from-[#E1E1E1] to-purple h-[7.5rem] p-0.5 rounded-[4px] flex mb-2"> */}
      <div className="bg-gradient-to-r from-[#E1E1E1] to-purple aspect-video p-0.5 rounded-[4px] flex mb-2">
        <div className="rounded-[2px] grow relative bg-[#2C2F48]">
          <img src={image} alt={name} className="h-full w-full" />
          {pending ? (
            <p className="font-bold text-[0.375rem] absolute left-[0.375rem] top-[0.375rem]">
              COMING SOON
            </p>
          ) : null}
        </div>
      </div>
      <div className="rounded-[6px] border border-violet p-[0.375rem] text-center uppercase overflow-x-auto no-scrollbar text-nowrap text-clip">
        {name}
      </div>
    </div>
  );
};

export default GameCard;
