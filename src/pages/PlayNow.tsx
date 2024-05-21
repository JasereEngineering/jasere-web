import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import { RootState, AppDispatch } from "../store";
import { startGame } from "../store/features/game";
import { GameState } from "../types";
import * as ROUTES from "../routes";

const PlayNow = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { gameTitle, gameSession, loading } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;

  return (
    <AppLayout className="flex flex-col" navClassName="mb-5">
      <div className="flex justify-center items-center grow p-4">
        <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[20px] mb-7 w-full">
          <div className="rounded-[18px] bg-gradient-to-r from-[#1E1E1E] to-[#18365E] px-[1.375rem] py-[2.5rem]">
            <Button
              text="PLAY NOW"
              className="p-2 border border-[#555CF6] font-lato font-black mb-6 !bg-inherit"
              loading={loading}
              onClick={() =>
                dispatch(
                  startGame({
                    onSuccess: () =>
                      navigate(
                        ROUTES.PLAY.START_GAME_FOR(
                          gameTitle as string,
                          gameSession as string
                        )
                      ),
                  })
                )
              }
            />
            <Button
              text="RETURN TO HOMEPAGE"
              className="p-2 border border-[#555CF6] font-lato font-black !bg-purple"
              onClick={() => navigate(ROUTES.PLAY.PICK_GAME)}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PlayNow;
