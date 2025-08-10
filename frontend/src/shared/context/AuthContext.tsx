// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authAPI,User, LoginData, SignupData } from "@/api/authAPI";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const isAuthenticated = Boolean(token);

  // Fetch user profile when token changes (validate token & sync user state)
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.user);
      } catch (error) {
        logout(); // Token invalid or expired — clear auth state
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
    } catch (error) {
      // Optionally: handle login errors here or rethrow for component-level handling
      throw error;
    }
  }, []);

  const signup = useCallback(
    async (signupData: SignupData) => {
      try {
        await authAPI.signup(signupData);
        // Auto-login after signup
        await login({ email: signupData.email, password: signupData.password });
      } catch (error) {
        throw error;
      }
    },
    [login]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    // Optionally redirect here if not handled globally
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
