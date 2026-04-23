import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  usuario: string | null;
  estaAutenticado: boolean;
  login: (nombre: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'kripass_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Al arrancar, leemos de localStorage para mantener la sesión
  const [usuario, setUsuario] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY);
  });
  const [estaAutenticado, setEstaAutenticado] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Sincronizamos localStorage cada vez que cambia el usuario
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(STORAGE_KEY, usuario);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [usuario]);

  const login = (nombre: string) => {
    setUsuario(nombre);
    setEstaAutenticado(true);
  };

  const logout = () => {
    setUsuario(null);
    setEstaAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  return context;
};