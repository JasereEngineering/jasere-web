export const AUTH = {
  SIGNUP: "/auth/signup",
  SIGNIN: "/auth/signin",
};

export const PLAY = {
  GET_STARTED: "/get-started",
  HURRAY: "/hurray",
  PLAY_GAME: "/play",
  PICK_GAME: "/pick-game",
  START_GAME: "/game/start",
  START_GAME_GUEST: "/game/start?player=participant",
  BEGIN_GAME_FOR: (
    gameTitle: string,
    gameSession: string,
    participant?: boolean
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
  LEADERBOARD_FOR: (gameTitle: string, gameSession: string) =>
    `/${gameTitle}/game/${gameSession}/leaderboard`,
  JOIN_GAME: "/join",
};

export const DASHBOARD = {
  PROFILE: "/profile",
};

export const SCRAMBLED_WORDS = {
  CATEGORY: "/scrambled-words/category",
  DIFFICULTY: "/scrambled-words/difficulty",
  CREATE_GAME: "/scrambled-words/create-game",
  NEW_GAME: "/scrambled-words/new-game",
  CREATE_QUESTIONS: "/scrambled-words/create-questions",
  GAME: "/scrambled-words/game/:gameSession",
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
