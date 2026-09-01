import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isSubscribed: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jobpilot_token'));
  const [user, setUser] = useState<User | null>(
    token
      ? {
          id: 'user_123',
          email: 'aniket@jobpilot.io',
          fullName: 'Aniket Senior Engineer',
          role: 'ADMIN',
          isSubscribed: true,
        }
      : null
  );

  const login = async (email: string, pass: string) => {
    const fakeToken = 'mock_jwt_token_jobpilot_2026';
    const fakeUser = {
      id: 'user_123',
      email,
      fullName: 'Aniket Senior Engineer',
      role: 'ADMIN',
      isSubscribed: true,
    };
    localStorage.setItem('jobpilot_token', fakeToken);
    setToken(fakeToken);
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem('jobpilot_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
