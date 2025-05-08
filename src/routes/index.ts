export const AUTH = {
  BEGIN_SIGNUP: "/auth/signup",
  COMPLETE_SIGNUP: "/account/verification",
  SIGNIN: "/auth/signin",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/account/reset",
};

export const PLAY = {
  CREATE_GAME: "/create-game",
  GET_STARTED: "/get-started",
  HURRAY: "/hurray",
  PLAY_GAME: "/play",
  PICK_GAME: "/pick-game",
  START_GAME: "/game/start",
  START_GAME_GUEST: "/game/start?player=participant",
  BEGIN_GAME_FOR: (
    gameTitle: string,
    gameSession: string,
    participant?: boolean,
  ) =>
    `/${gameTitle}/game/${gameSession}${
      participant ? "?player=participant" : ""
    }`,
  SELECT_CATEGORY: "/:gameTitle/category",
  SELECT_CATEGORY_FOR: (gameTitle: string) => `/${gameTitle}/category`,
  SELECT_DIFFICULTY: "/:gameTitle/difficulty",
  SELECT_DIFFICULTY_FOR: (gameTitle: string) => `/${gameTitle}/difficulty`,
  CREATE_GAME_SESSION: "/:gameTitle/create-game",
  CREATE_GAME_SESSION_FOR: (gameTitle: string) => `/${gameTitle}/create-game`,
  GAME_SESSION: "/:gameTitle/game/:gameSession",
  GAME_SESSION_FOR: (gameTitle: string, gameSession: string) =>
    `/${gameTitle}/game/${gameSession}`,
  LEADERBOARD: "/:gameTitle/game/:gameSession/leaderboard",
  NEW_LEADERBOARD: "/test-leaderboard",
  LEADERBOARD_FOR: (
    gameTitle: string,
    gameSession: string,
    participant?: boolean,
  ) =>
    `/${gameTitle}/game/${gameSession}/leaderboard${
      participant ? "?player=participant" : ""
    }`,
  JOIN_GAME: "/join",
};

export const DASHBOARD = {
  PROFILE: "/profile",
  GAMES: "/profile/games",
  GAME_DETAILS: "/profile/games/:gameSession",
  GAME_DETAILS_FOR: (gameSession: string) => `/profile/games/${gameSession}`,
  LEADERBOARD: "/profile/leaderboard",
};

export const SCRAMBLED_WORDS = {
  CATEGORY: "/scrambled-words/category",
  DIFFICULTY: "/scrambled-words/difficulty",
  CREATE_GAME: "/scrambled-words/create-game",
  NEW_GAME: "/scrambled-words/new-game",
  CREATE_QUESTIONS: "/scrambled-words/create-questions",
  GAME: "/scrambled-words/game/:gameSession",
  AVAILABLE_CATEGORY_TRIVIA: "/scrambled-words/category/available-trivia",
  AVAILABLE_CATEGORY: "/:gameTitle/available-category",
  AVAILABLE_CATEGORY_FOR: (gameTitle: string) =>
    `/${gameTitle}/available-category`,
  ADD_NEW_CATEGORY: "/:gameTitle/add-new-category",
  ADD_NEW_CATEGORY_FOR: (gameTitle: string) => `/${gameTitle}/add-new-category`,
  ADD_TRIVIA: "/:gameTitle/add-trivia",
  ADD_TRIVIA_FOR: (gameTitle: string) => `/${gameTitle}/add-trivia`,
  SAVED_TRIVIA: "/:gameTitle/saved-trivia",
  SAVED_TRIVIA_FOR: (gameTitle: string) => `/${gameTitle}/saved-trivia`,
  SELECT_TRIVIA: "/:gameTitle/select-trivia",
  SELECT_TRIVIA_FOR: (gameTitle: string) => `/${gameTitle}/select-trivia`,
  PRESET_TRIVIA: "/:gameTitle/preset-trivia",
  PRESET_TRIVIA_FOR: (gameTitle: string) => `/${gameTitle}/preset-trivia`,
  SUCCESS: "/:gameTitle/success",
  SUCCESS_FOR: (gameTitle: string) => `/${gameTitle}/success`,
};

export const CORRECT = {
  CATEGORY: "/correct/category",
  DIFFICULTY: "/correct/difficulty",
  CREATE_GAME: "/correct/create-game",
  NEW_GAME: "/correct/new-game",
  CREATE_QUESTIONS: "/correct/create-questions",
  GAME: "/correct/game/:gameSession",
};

export const TRUTH_AND_DARE = {
  SET_NAME: "/truth-and-dare/set-name",
  LOBBY: "/truth-and-dare/lobby",
  SELECT_PLAYER: "/truth-and-dare/select-player",
  PICK_YOUR_CARD: "/truth-and-dare/pick-your-card",
  CARD: "/truth-and-dare/card",
};

export const LEMON = {
  DIFFICULTY: "/lemon/difficulty",
  CREATE_GAME: "/lemon/create-game",
  NEW_GAME: "/lemon/new-game",
  CREATE_QUESTIONS: "/lemon/create-questions",
  GAME: "/lemon/game/:gameSession",
  RESULT: "/lemon/game/:gameSession/result",
  RESULT_FOR: (gameSession: string, participant?: boolean) =>
    `/lemon/game/${gameSession}/result${
      participant ? "?player=participant" : ""
    }`,
};
