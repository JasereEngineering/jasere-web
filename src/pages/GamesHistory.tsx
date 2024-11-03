import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Loader from "../components/misc/Loader";

import { RootState, AppDispatch } from "../store";
import { UserState } from "../types";
import { fetchGames } from "../store/features/user";
import { colorMap, formatDate } from "../helpers/misc";
import * as ROUTES from "../routes";

const GamesHistory = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { games, loading } = useSelector<RootState>(
    ({ user }) => user,
  ) as UserState;

  const [type, setType] = useState<"created" | "played">("played");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGames({ page, limit: 20, status: type }));
  }, [dispatch, type, page]);

  return (
    <AppLayout className="flex flex-col font-lal text-white px-4 pt-[7.5rem] pb-[4.875rem]">
      {loading ? <Loader /> : null}
      <div className="flex items-center border-white border-b-[0.3px] gap-x-[1.125rem] mb-3 mx-[-1rem]">
        <div></div>
        <h1
          className={`text-[1.25rem] leading-[1.959rem] tracking-[-0.25px] text-[#8D8D8D] ${
            type === "played"
              ? "border-white border-b-2 text-white text-[1.5rem] leading-[2.351rem]"
              : ""
          }`}
          onClick={() => {
            setType("played");
            setPage(1);
          }}
        >
          Games Played
        </h1>
        <h1
          className={`text-[1.25rem] leading-[1.959rem] tracking-[-0.25px] text-[#8D8D8D] ${
            type === "created"
              ? "border-white border-b-2 text-white text-[1.5rem] leading-[2.351rem]"
              : ""
          }`}
          onClick={() => {
            setType("created");
            setPage(1);
          }}
        >
          Games Created
        </h1>
      </div>
      <div className="flex flex-col gap-y-2 mb-8">
        {games?.data.map((game, i) => (
          <div
            className="border border-white rounded-[20px] p-4 pl-4 font-inter font-medium"
            key={i}
            onClick={() =>
              navigate(ROUTES.DASHBOARD.GAME_DETAILS_FOR(game.game_session_id))
            }
          >
            <div className="flex justify-between mb-[1.375rem]">
              <div>
                <p className="text-[1rem] leading-[1.21rem] tracking-[-0.25px] mb-1.5 capitalize">
                  {game.game_name}
                </p>
                <p
                  className="text-pink text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]"
                  style={{
                    color:
                      colorMap[
                        game.game_name
                          ?.toLowerCase()
                          .replaceAll(" ", "-") as keyof typeof colorMap
                      ],
                  }}
                >
                  {game.difficulty_level} | 1 round
                </p>
              </div>
              <p className="text-right text-[#A6A6A6] text-[0.813rem] leading-[0.983rem] tracking-[-0.25px]">
                {formatDate(game.createdAt)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#DADADA] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
                Time Played: {game.time_played || 0} min
                {+game.time_played > 1 ? "s" : ""}
              </p>
              <p className="text-right text-[#DADADA] text-[0.75rem] leading-[0.908rem] tracking-[-0.25px]">
                No. of players: {game.player_count}
              </p>
            </div>
          </div>
        ))}
        {games && +games.total > page * +games.limit && !loading ? (
          <div
            className="font-lex font-light text-white text-[0.688rem] leading-[0.859rem] flex justify-center items-center py-6"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </div>
        ) : null}
      </div>
    </AppLayout>
  );
};

export default GamesHistory;
