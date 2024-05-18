const PlayerCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="bg-white flex flex-col pt-4 px-5 font-pop font-medium text-[0.813rem] rounded-[6px] w-[5.188rem] h-[8.063rem] mr-4">
      <img
        src={image}
        className="rounded-full h-[2.688rem] w-[2.688rem] border-4 border-[#FDEDEB] mb-[0.563rem]"
        alt="profile"
      />
      <p className="text-[#1A1A1A] text-center text-clip overflow-hidden">
        {name}
      </p>
    </div>
  );
};

export default PlayerCard;
