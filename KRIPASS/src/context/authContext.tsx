import { createContext, useContext, useState, type ReactNode } from 'react';

//Definimos qué datos habrá en la "nube" global
interface AuthContextType {
  usuario: string | null;
  estaAutenticado: boolean;
  login: (nombre: string) => void;
  logout: () => void;
}

//Creamos el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//El Provider: El componente que envuelve a la App y reparte los datos
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);

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

//Hook para consumir el contexto fácilmente
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  return context;
};