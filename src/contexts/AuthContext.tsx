// Contexto de autenticación: gestiona sesión mock, persistencia en localStorage y estado global
import React, { createContext, useContext, useState, useEffect } from 'react';

// Modelo de usuario básico utilizado en la sesión mock
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  institution: string;
}

// Interfaz expuesta por el contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// Creación del contexto (se permite undefined para validar uso correcto)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook de conveniencia para consumir el contexto y asegurar que se use dentro del provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider: inicializa usuario desde localStorage y expone funciones login/logout
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al montar: intenta restaurar sesión desde localStorage
    const storedUser = localStorage.getItem('aura_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // login: simula petición remota y genera un usuario mock (TODO: integrar API real)
  const login = async (email: string, _password: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'Administrator',
        institution: 'University of Technology',
      };

      setUser(mockUser);
      localStorage.setItem('aura_user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // logout: limpia estado y almacenamiento persistente
  const logout = () => {
    setUser(null);
    localStorage.removeItem('aura_user');
  };

  // Objeto de valor entregado al arbol de componentes
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};