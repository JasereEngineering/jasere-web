import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLocalStorage } from "./useLocalStorage";
import { AuthContextType, UserContext } from "../types";
import { AppDispatch } from "../store";
import { fetchProfile } from "../store/features/user";
import * as ROUTES from "../routes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>()

  const [user, setUser] = useLocalStorage("user", null);

  const login = useCallback(
    async (data: UserContext) => {
      setUser(data);
      dispatch(fetchProfile())
    },
    [setUser, dispatch]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.clear();
    navigate(ROUTES.PLAY.GET_STARTED, { replace: true });
    window.location.reload();
  }, [setUser, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
