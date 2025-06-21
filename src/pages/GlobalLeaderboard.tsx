import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";
import Share from "../components/forms/Share";

import avatar from "../assets/images/avatar2.png";
import trophy from "../assets/images/trophy.svg";
import First from "../assets/images/first-badge.svg";
import Second from "../assets/images/second-badge.svg";
import Third from "../assets/images/third-badge.svg";
import ShareImg from "../assets/images/share.svg";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchLeaderboard } from "../store/features/user";
import { avatarMap } from "../helpers/misc";

const leaderboardHeights = [5.5, 7.3125, 9.1875];
const ordinalNumbers = ["1st", "2nd", "3rd"];
const podiumStyles = [
  { background: "linear-gradient(149.96deg, #AA3F29 7.03%, #914434 95.36%)" },
  {
    background: `
      linear-gradient(160.79deg, #F5F2F2 1.89%, #BEB9B9 97.59%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))
    `,
  },
  { background: "linear-gradient(167.76deg, #E7C579 1.43%, #FFB407 98.46%)" },
];

const GlobalLeaderboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { leaderboard, loading } = useSelector<RootState>(
    ({ user }) => user,
  ) as UserState;

  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLeaderboard({ page, limit: 10 }));
  }, [dispatch, page]);

  const topThree =
    leaderboard?.data
      ?.slice()
      .sort((a, b) => b.point - a.point)
      .slice(0, 3) || [];

  const badgeMap = [First, Second, Third];

  return (
    <AppLayout className="flex flex-col font-lal text-white px-4 pt-[7.5rem] pb-[4.875rem]">
      {loading ? <Loader /> : null}
      <h1 className="text-[1.875rem] leading-[2.979rem] tracking-[-0.25px] text-center w-full">
        LEADERBOARD
      </h1>

      <div className="flex flex-col items-center w-full">
        {topThree.length > 0 && (
          <div
            className={`grid grid-cols-${topThree.length} gap-x-8 w-full items-center mt-2 px-4`}
          >
            {topThree
              .slice()
              .reverse()
              .map((r: any, index: number) => (
                <div className="place-self-end w-full" key={index}>
                  <div className="flex justify-center mb-2">
                    <img
                      loading="lazy"
                      src={
                        r?.avatar
                          ? avatarMap[r?.avatar as keyof typeof avatarMap]
                          : avatar
                      }
                      alt="avatar"
                      className="h-[3.375rem] w-[3.375rem] rounded-full"
                    />
                  </div>
                  <div className="flex justify-center border-0 border-white z-10">
                    <p className="font-thin text-[15px] tracking-[-0.34px] capitalize">
                      {topThree.findIndex(
                        (res: any) => res.player_name === r.player_name,
                      ) === 0 && (
                        <img
                          loading="lazy"
                          src={trophy}
                          alt="trophy"
                          className="inline-block h-[1.1875rem] w-[1.1875rem] mr-1"
                        />
                      )}
                      {r.player_name}
                    </p>
                  </div>
                  <div className="flex justify-center mb-5 border-0 border-white items-center gap-1">
                    <img
                      loading="lazy"
                      src={
                        badgeMap[
                          topThree.findIndex(
                            (res: any) => res.player_name === r.player_name,
                          )
                        ]
                      }
                      alt="badge"
                      className="h-[0.75rem] w-[0.75rem]"
                    />
                    <p className="font-light font-manjari text-[11px] tracking-[0.01em]">
                      {r.point} Point(s)
                    </p>
                  </div>
                  <div
                    style={{
                      height: `${leaderboardHeights[index]}rem`,
                      ...podiumStyles[index],
                    }}
                    className="flex place-items-center justify-center text-white rounded-[15px] font-lal text-[1.9375rem]"
                  >
                    <label>
                      {
                        ordinalNumbers[
                          topThree.findIndex(
                            (res: any) => res.player_name === r.player_name,
                          )
                        ]
                      }
                    </label>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div
          className="px-6 py-3 my-8 rounded-xl w-full flex items-center gap-4"
          style={{
            background: "linear-gradient(90deg, #FBAF00 0%, #956800 100%)",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="bg-white min-w-9 min-h-9 rounded-full" />
            <p className="text-white text-[15px] tracking-[-0.34px]">User</p>
          </div>

          <div className="bg-white w-[1px] h-[80%]" />

          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex flex-col items-center gap-2">
              <p className="text-white text-sm">Points</p>
              <p className="font-manjari text-white text-sm">N/A</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white text-sm">Time spent</p>
              <p className="font-manjari text-white text-sm">N/A</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-white text-sm">Position</p>
              <p className="font-manjari text-white text-sm">N/A</p>
            </div>
          </div>
        </div>

        {leaderboard?.data
          ?.slice()
          .sort((a, b) => b.point - a.point)
          .slice(3)
          .map((r: any, i: number) => (
            <div
              key={i}
              className={`flex justify-between items-center rounded-[33px] p-1.5 pr-3 w-full mb-3`}
            >
              <div className="flex items-center">
                <span
                  className={`font-lal text-white text-[1.123rem] leading-[1.759rem] tracking-[-0.45px] ${
                    i + 4 < 10 ? "mr-6" : "mr-4"
                  }`}
                >
                  {i + 4}
                </span>
                <img
                  loading="lazy"
                  src={
                    r.avatar
                      ? avatarMap[r.avatar as keyof typeof avatarMap]
                      : avatar
                  }
                  alt="avatar"
                  className="mr-3 h-[2.5rem] w-[2.5rem] rounded-full"
                />
                <span className="font-lal text-white text-[1.123rem] leading-[1.759rem] tracking-[-0.45px] capitalize">
                  {r.player_name}
                </span>
              </div>
              <div className="flex flex-row-reverse items-center gap-x-1">
                <span className="font-manjari text-white text-[0.909rem] leading-[1.136rem] tracking-[-0.45px]">
                  {r.point}pts
                </span>
              </div>
            </div>
          ))}

        {leaderboard &&
        +leaderboard.total > page * +leaderboard.limit &&
        !loading ? (
          <div
            className="font-lex font-light text-white text-[0.688rem] leading-[0.859rem] flex justify-center items-center py-6"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </div>
        ) : null}

        <button
          onClick={() => {
            setModal(true);
          }}
          className="mb-12 py-2 text-[22px] font-lal flex items-center gap-2 px-3 border-[1.38px] border-white rounded-full"
        >
          <img src={ShareImg} alt="share" className="w-6 h-6 mb-[2px]" />
          Share
        </button>
      </div>

      <Share onClose={() => setModal(false)} showModal={modal} />
    </AppLayout>
  );
};

export default GlobalLeaderboard;
