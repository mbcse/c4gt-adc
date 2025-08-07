// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/services/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));

  // Optionally, fetch user profile on initial mount if token exists
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await authAPI.getProfile(); 
          setUser(response.user);
        } catch (err) {
          // If token is invalid/expired, logout
          logout();
        }
      }
    };
    fetchUserProfile();
  }, [token]);

  const login = async ({ email, password }: LoginData) => {
    const data = await authAPI.login(email, password);
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("authToken", data.token);
  };

  const signup = async ({ name, email, password }: SignupData) => {
    await authAPI.signup(name, email, password);
    await login({ email, password });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
