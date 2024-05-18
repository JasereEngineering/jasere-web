import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { GameState } from "../../../types";
import request from "../../../helpers/request";
import { isRejectedAction, isPendingAction, isFulfilledAction } from "../utils";
import { RootState } from "../..";

const initialState: GameState = {
  games: [],
  game: null,
  gameTitle: null,
  gameName: null,
  gameSession: null,
  gamePin: null,
  trivia: [],
  currentTrivia: 0,
  categories: [],
  results: [],
  category: null,
  loading: false,
  sessionCreated: false,
};

export const createGame = createAsyncThunk(
  "game/create",
  async (name: string, { getState }) => {
    const {
      game: { game, category },
    } = getState() as RootState;

    return await request({
      url: "/game/create",
      method: "post",
      body: { name, game_id: game, category_id: category },
    });
  }
);

export const startGame = createAsyncThunk(
  "game/start",
  async ({ onSuccess }: { onSuccess: () => void }, { getState }) => {
    const {
      game: { gameSession },
    } = getState() as RootState;

    return await request({
      url: "/game/start",
      method: "post",
      body: { game_session_id: gameSession },
      onSuccess,
    });
  }
);

export const fetchGameCategories = createAsyncThunk(
  "game/categories",
  async (game_id: string) => {
    return await request({
      url: `/game/categories/${game_id}`,
      method: "get",
    });
  }
);

export const fetchGames = createAsyncThunk("game/all", async () => {
  return await request({
    url: "/game/all",
    method: "get",
  });
});

export const fetchGameResult = createAsyncThunk(
  "game/result",
  async (session: string) => {
    return await request({
      url: `/game/result/${session}`,
      method: "get",
    });
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectGame: (state, { payload }) => {
      state.game = payload.id;
      state.gameTitle = payload.title;
    },
    selectCategory: (state, { payload }) => {
      state.category = payload;
    },
    clearGameSession: (state) => {
      state.sessionCreated = false;
    },
    updateTrivia: (state, { payload }) => {
      state.trivia = state.trivia.map((item: any, i: number) => {
        if (i === payload) return { ...item, completed: true };
        return item;
      });
      if (state.trivia[payload + 1]) {
        state.currentTrivia = payload + 1;
      } else {
        state.currentTrivia = 0;
      }
    },
    endGame: (state) => {
      state.currentTrivia = 0;
      state.trivia = [];
    },
    joinGame: (state, { payload }) => {
      state.trivia = JSON.parse(payload.trivia).map((item: any) => ({
        ...item,
        completed: false,
      }));
      state.gameSession = payload.game_session_id;
      state.gameName = payload.game_name;
      state.gameTitle = payload.game;
      state.gamePin = payload.game_pin;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPendingAction("game"), (state, action) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction("game"), (state, action) => {
        state.loading = false;
      })
      .addMatcher(isFulfilledAction("game"), (state, action) => {
        switch (action.type) {
          case "game/all/fulfilled":
            state.games = action.payload;
            break;
          case "game/categories/fulfilled":
            state.categories = action.payload;
            break;
          case "game/create/fulfilled":
            state.gameName = action.payload.name;
            state.gameSession = action.payload.game_session_id;
            state.sessionCreated = true;
            break;
          case "game/start/fulfilled":
            state.gamePin = action.payload.game_pin;
            state.trivia = JSON.parse(action.payload.trivia).map(
              (item: any) => ({ ...item, completed: false })
            );
            break;
          case "game/result/fulfilled":
            state.results = action.payload.results.sort(
              (a: any, b: any) => b.point - a.point
            );
            break;
        }

        state.loading = false;
      });
  },
});

export const {
  selectGame,
  selectCategory,
  clearGameSession,
  updateTrivia,
  endGame,
  joinGame,
} = gameSlice.actions;

export default gameSlice.reducer;
