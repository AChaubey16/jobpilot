import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'CANDIDATE' | 'ADMIN';
  isSubscribed: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string, role?: 'CANDIDATE' | 'ADMIN') => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jobpilot_token'));
  const storedUser = localStorage.getItem('jobpilot_user');
  
  const [user, setUser] = useState<User | null>(
    storedUser
      ? JSON.parse(storedUser)
      : token
      ? {
          id: 'usr-1',
          email: 'aniket@jobpilot.io',
          fullName: 'Aniket Candidate',
          role: 'CANDIDATE',
          isSubscribed: true,
        }
      : null
  );

  const login = async (email: string, pass: string, role: 'CANDIDATE' | 'ADMIN' = 'CANDIDATE'): Promise<User> => {
    const fakeToken = `mock_jwt_${role.toLowerCase()}_token_2026`;
    const fakeUser: User = {
      id: role === 'ADMIN' ? 'adm-1' : 'usr-1',
      email,
      fullName: role === 'ADMIN' ? 'SaaS System Administrator' : 'Aniket Candidate',
      role,
      isSubscribed: true,
    };
    
    localStorage.setItem('jobpilot_token', fakeToken);
    localStorage.setItem('jobpilot_user', JSON.stringify(fakeUser));
    setToken(fakeToken);
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    localStorage.removeItem('jobpilot_token');
    localStorage.removeItem('jobpilot_user');
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
