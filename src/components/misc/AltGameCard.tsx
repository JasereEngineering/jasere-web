const AltGameCard = ({
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
      className="font-sansita cursor-pointer flex flex-col items-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grow relative min-w-[15.625rem] flex justify-center items-center aspect-video mb-5">
        <img
          loading="lazy"
          src={image}
          alt={name}
          className="absolute top-0 h-full w-full object-cover"
        />
        {pending ? (
          <p className="font-bold text-[0.375rem] absolute left-[0.375rem] top-[0.375rem]">
            COMING SOON
          </p>
        ) : null}
        <p className="text-[2rem] text-wrap text-center max-w-[10rem] capitalize z-10">
          {name}
        </p>
      </div>
      <div className="border border-white p-2 text-center uppercase overflow-x-auto no-scrollbar text-nowrap text-clip w-[11.75rem] font-lato font-black text-[1.5rem]">
        {name}
      </div>
    </div>
  );
};

export default AltGameCard;
