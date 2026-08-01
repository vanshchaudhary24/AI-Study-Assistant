import{
  createContext,
  useState,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import {
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/auth.service";

import type {
  LoginRequest,
  User,
} from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    data: LoginRequest
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}



export const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: Props) => {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    refreshUser();
  }, []);


  const refreshUser = async () => {

    try {

      const token =
        localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      const response =
        await getCurrentUser();

      setUser(response.data);

    } catch {

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

    } finally {

      setLoading(false);

    }

  };

  const login = async (
    data: LoginRequest
  ) => {

    const response =
      await loginUser(data);

    localStorage.setItem(
      "accessToken",
      response.data.accessToken
    );

    localStorage.setItem(
      "refreshToken",
      response.data.refreshToken
    );

    setUser(
      response.data.user
    );

  };

  const logout = async () => {

    try {

      await logoutUser();

    } finally {

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      setUser(null);

    }

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated:
          !!user,
        login,
        logout,
        refreshUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};