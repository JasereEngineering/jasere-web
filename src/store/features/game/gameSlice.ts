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
  levels: [],
  results: [],
  players: [],
  category: null,
  categoryName: null,
  level: null,
  difficulty: null,
  loading: false,
  sessionCreated: false,
};

export const createGame = createAsyncThunk(
  "game/create",
  async (name: string, { getState }) => {
    const {
      game: { game, category, level },
    } = getState() as RootState;

    return await request({
      url: "/game/create",
      method: "post",
      body: {
        name,
        game_id: game,
        category_id: category,
        difficulty_level: level,
      },
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

export const fetchGameLevels = createAsyncThunk("game/levels", async () => {
  return await request({
    url: "/game/levels",
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
    selectLevel: (state, { payload }) => {
      state.level = payload;
    },
    setPlayers: (state, { payload }) => {
      state.players = payload;
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
      if (payload.trivia)
        state.trivia = payload.trivia.trivia.map((item: any) => ({
          ...item,
          completed: false,
        }));
      if (payload.game_session_id) state.gameSession = payload.game_session_id;
      if (payload.name) state.gameName = payload.name;
      if (payload.game_name) state.gameTitle = payload.game_name;
      if (payload.game_pin) state.gamePin = payload.game_pin;
      if (payload.category_name) state.categoryName = payload.category_name;
      if (payload.difficulty_level) state.difficulty = payload.difficulty_level;
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
          case "game/levels/fulfilled":
            state.levels = action.payload;
            break;
          case "game/categories/fulfilled":
            state.categories = action.payload;
            break;
          case "game/create/fulfilled":
            state.gameName = action.payload.data.name;
            state.gameSession = action.payload.data.game_session_id;
            state.sessionCreated = true;
            state.gamePin = action.payload.data.game_pin;
            state.trivia = JSON.parse(action.payload.data.trivia).map(
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
  selectLevel,
  setPlayers,
  clearGameSession,
  updateTrivia,
  endGame,
  joinGame,
} = gameSlice.actions;

export default gameSlice.reducer;
