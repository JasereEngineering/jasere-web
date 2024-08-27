import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../..";
import { UserState } from "../../../types";
import request from "../../../helpers/request";
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";

const initialState: UserState = {
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  id: null,
  userId: null,
  loading: false,
  isActive: false,
  gamesPlayed: null,
  gamesCreated: null,
  badges: null,
  games: null,
  leaderboard: null,
  game: null
};

export const fetchProfile = createAsyncThunk("user/profile", async () => {
  return await request({
    url: "/user/profile",
    method: "get",
  });
});

export const fetchGames = createAsyncThunk(
  "user/games",
  async ({ page, limit }: { page: number; limit: number }) => {
    return await request({
      url: `/user/games/played?page=${page}&limit=${limit}`,
      method: "get",
    });
  }
);

export const fetchGameDetails = createAsyncThunk(
  "user/game/details",
  async (session: string) => {
    return await request({
      url: `/game/details/${session}`,
      method: "get",
    });
  }
);

export const fetchLeaderboard = createAsyncThunk(
  "user/leaderboard",
  async ({ page, limit }: { page: number; limit: number }) => {
    return await request({
      url: `/user/leaderboard?page=${page}&limit=${limit}`,
      method: "get",
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction("user"), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction("user"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilledAction("user"), (state, action) => {
        switch (action.type) {
          case "user/profile/fulfilled":
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.userId = action.payload.user_id;
            state.id = action.payload.id;
            state.isActive = action.payload.isActive;
            state.badges = action.payload.total_badges_collected;
            state.gamesCreated = action.payload.total_games_created;
            state.gamesPlayed = action.payload.total_games_played;
            break;
          case "user/games/fulfilled":
            state.games = action.payload;
            break;
          case "user/games/details/fulfilled":
            state.game = action.payload;
            break;
          case "user/leaderboard/fulfilled":
            state.leaderboard = action.payload;
            break;
        }

        state.loading = false;
      });
  },
});

export default userSlice.reducer;
