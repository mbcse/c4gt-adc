// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authAPI, LoginData, SignupData } from "@/api/authAPI";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<{ message: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true);
  const isAuthenticated = Boolean(token);

  // Fetch user profile when token changes (validate token & sync user state)
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false); 
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.user);
      } catch (error) {
        logout(); // Token invalid or expired — clear auth state
      } finally {
        setLoading(false); 
      }
    };

    fetchUserProfile();
  }, [token]);

  const login = useCallback(async ({ email, password }: LoginData) => {
    try {
      const data = await authAPI.login(email, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("authToken", data.token);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  }, []);

const signup = useCallback(
    async (signupData: SignupData): Promise<{ message: string }> => {
      try {
        const response = await authAPI.signup(signupData);
        return response;
      } catch (error) {
        const errorMessage = (error as any).response?.data?.error || (error as any).message || 'Signup failed';
        throw new Error(errorMessage);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
