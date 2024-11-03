const AltPlayerCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="relative w-[20.5rem]">
      <img
        loading="lazy"
        className="w-[7.125rem] h-[7.125rem] rounded-full object-cover relative z-10"
        src={image}
        alt={name}
      />
      <div className="absolute h-[5.063rem] w-[19.063rem] flex justify-center items-center pl-[5.5rem] pr-3 rounded-[17px] bg-orange top-1/2 left-[1.25rem] transform -translate-y-1/2">
        <p className="font-lato font-black text-[2.5rem] leading-[1.875rem] capitalize text-center">
          {name}
        </p>
      </div>
    </div>
  );
};

export default AltPlayerCard;
