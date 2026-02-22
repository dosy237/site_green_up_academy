import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthUser {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au chargement (localStorage seulement)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Restaurer la session depuis localStorage
      const userData: AuthUser = {
        id: '1',
        username: 'admin',
        role: 'admin'
      };
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Authentification locale sans backend
      if (username === 'admin' && password === 'gua2026') {
        const userData: AuthUser = {
          id: '1',
          username: 'admin',
          role: 'admin'
        };
        const token = 'local_auth_token_' + Date.now();
        localStorage.setItem('authToken', token);
        setUser(userData);
      } else {
        throw new Error('Identifiants invalides');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


