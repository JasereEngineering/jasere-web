export interface UserContext {
  firstName?: string;
  lastName?: string;
  username?: string;
  id: string;
}

export interface AuthContextType {
  user: UserContext;
  login: (data: UserContext) => Promise<void>;
  logout: () => void;
}

export interface AuthState {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  id: string | null;
  loading: boolean;
}

export interface UserState {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  id: string | null;
  userId: string | null;
  loading: boolean;
  isActive: boolean;
}

export interface GameState {
  games: any[];
  game: string | null;
  gameTitle: string | null;
  gameTag: string | null;
  gameName: string | null;
  gameSession: string | null;
  gamePin: string | null;
  trivia: any[];
  currentTrivia: number;
  categories: any[];
  levels: any[];
  category: string | null;
  categoryName: string | null;
  level: string | null;
  difficulty: string | null;
  avatar: string | null;
  lemonNumber: number | null;
  lemonNumberPrev: number | null;
  lemonNumberNext: number | null;
  loading: boolean;
  sessionCreated: boolean;
  results: any[];
  players: any[];
  lemonsDisplayed: number[];
}

export interface RequestArgs {
  method: "post" | "get" | "delete" | "put";
  url: string;
  body?: any;
  type?: "form-data" | "json";
  onSuccess?: () => void;
}
