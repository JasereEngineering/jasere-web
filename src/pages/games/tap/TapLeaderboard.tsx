import RoundedButton from "../../../components/forms/RoundedButton";
import AppLayout from "../../../components/layouts/AppLayout";

import avatar from "../../../assets/images/avatar2.png";
import up from "../../../assets/images/up.svg";
import down from "../../../assets/images/down.svg";
import streakIcon from "../../../assets/images/streak.svg"; // Renamed import

interface LeaderboardItemProps {
  name: string;
  status: "up" | "down" | "stable";
  streak: boolean;
  avatar: string;
}

function LeaderboardItem({
  name,
  status,
  streak,
  avatar,
}: LeaderboardItemProps) {
  return (
    <div className="flex items-center text-white gap-3">
      <img
        src={avatar}
        alt="profile"
        className="w-[38px] h-[32px] object-cover rounded-full"
      />
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5">
          <p className="text-[15px] text-white">{name}</p>
          <span>
            {status === "up" && (
              <img src={up} alt="up" className="w-[16px] h-[16px]" />
            )}
            {status === "down" && (
              <img src={down} alt="down" className="w-[16px] h-[16px]" />
            )}
          </span>
        </div>
        {streak && (
          <img src={streakIcon} alt="streak" className="w-[16px] h-[16px]" />
        )}
      </div>
    </div>
  );
}

function TapLeaderboard() {
  const leaderboardData: LeaderboardItemProps[] = [
    { name: "Allen", status: "up", streak: true, avatar: avatar },
    { name: "Ola", status: "up", streak: true, avatar: avatar },
    {
      name: "Lillian",
      status: "stable",
      streak: false,
      avatar: avatar,
    },
    { name: "Allen", status: "down", streak: false, avatar: avatar },
    { name: "Ola", status: "down", streak: false, avatar: avatar },
    {
      name: "Lillian",
      status: "stable",
      streak: false,
      avatar: avatar,
    },
  ];

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[6.7rem] pb-[4.25rem]">
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <h1 className="text-[30px] tracking-[-0.25px] mb-6">LEADERBOARD</h1>
        <div className="bg-[#2A2A29] p-4 flex flex-col gap-[22px] rounded-md w-[92%]">
          {leaderboardData.map((player, index) => (
            <LeaderboardItem
              key={index}
              name={player.name}
              status={player.status}
              streak={player.streak}
              avatar={player.avatar}
            />
          ))}
        </div>
        <p className="text-base font-bold font-manjari text-center mt-8">
          Allen & Ola are on a 4 correct streak!
        </p>
        <RoundedButton text="Next Round" />
      </div>
    </AppLayout>
  );
}

export default TapLeaderboard;
